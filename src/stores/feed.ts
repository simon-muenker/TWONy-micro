import _ from "lodash";
import { logger } from "@nanostores/logger";
import { atom, computed } from "nanostores";

import {
  type ItemMetrics,
  calculateItemMetrics,
  aggregateItemMetrics,
} from "@simulation";
import { chat } from "@api/chat";
import { classify } from "@api/classify";

import { settingsAgentStore } from "@stores/settings";
import { personaUserStore, type Persona } from "@stores/personas";
import { createChat } from "@stores/instructions";

// Type Definitions
export type ThreadItem = {
  icon: string;
  name: string;
  message: string;
  metrics: ItemMetrics;
};

export type Thread = {
  post: ThreadItem;
  replies?: Array<ThreadItem>;
  metrics: ItemMetrics;
};

// Store Management
export const feedStore = atom<Array<Thread>>([]);

// Logger
logger({
  feedStore: feedStore,
});

// Derived Stores
export const reverseFeedStore = computed(
  feedStore,
  (feed: Array<Thread>): Array<Thread> => {
    return [...feed].reverse();
  },
);

export const rankedFeedStore = computed(
  feedStore,
  (feed: Array<Thread>): Array<Thread> => {
    return [...feed].sort((a, b) => b.metrics.score - a.metrics.score);
  },
);

export const threadItemStore = computed(
  feedStore,
  (feed: Array<Thread>): Array<ThreadItem> => {
    return feed.flatMap((thread) => [thread.post, ...(thread.replies ?? [])]);
  },
);

export const threadItemsByNameStore = computed(
  threadItemStore,
  (items: Array<ThreadItem>): Record<string, Array<ThreadItem>> => {
    return _.groupBy(items, "name");
  },
);

export const threadItemAvgMetricsStore = computed(
  threadItemStore,
  (items: Array<ThreadItem>): ItemMetrics => {
    return aggregateItemMetrics(items.map((item) => item.metrics));
  },
);

export const nameAvgMetricsStore = computed(
  threadItemsByNameStore,
  (records: Record<string, Array<ThreadItem>>): Record<string, ItemMetrics> => {
    return _.mapValues(records, (items: Array<ThreadItem>): ItemMetrics => {
      return aggregateItemMetrics(items.map((item) => item.metrics));
    });
  },
);

// Modifiers
export function clearFeed(): void {
  feedStore.set([]);
}

export function pushToFeed(thread: Thread): void {
  updateThreadMetrics(thread);
  feedStore.set([...feedStore.get(), thread]);
}

export function addPost(item: ThreadItem): void {
  pushToFeed({
    post: item,
    metrics: item.metrics,
  });
}

export function addReply(threadID: number, item: ThreadItem): void {
  let feed: Array<Thread> = feedStore.get();

  if (feed[threadID].replies) {
    feed[threadID].replies = [...feed[threadID].replies, item];
  } else {
    feed[threadID].replies = [item];
  }

  updateThreadMetrics(feed[threadID]);
  feedStore.set([...feed]);
}

// User Behavior
export async function post(
  message: string,
  persona: Persona = personaUserStore.get()[0],
): Promise<void> {
  const classifyResult = await classify(message);

  addPost({
    icon: persona.icon,
    name: persona.name,
    message: message,
    metrics: calculateItemMetrics(classifyResult[0]),
  });
}

export async function reply(
  threadID: number,
  message: string,
  persona: Persona = personaUserStore.get()[0],
): Promise<void> {
  const classifyResult = await classify(message);

  addReply(threadID, {
    icon: persona.icon,
    name: persona.name,
    message: message,
    metrics: calculateItemMetrics(classifyResult[0]),
  });
}

// Agent Behavior
export async function agentPost(persona: Persona): Promise<void> {
  const chatResult = await chat(
    settingsAgentStore.get().model,
    createChat(persona, "post", " "),
  );

  post(chatResult.choices[0].message.content, persona);
}

export async function agentReply(
  threadID: number,
  persona: Persona,
): Promise<void> {
  const chatResult = await chat(
    settingsAgentStore.get().model,
    createChat(persona, "reply", feedStore.get()[threadID].post.message),
  );

  reply(threadID, chatResult.choices[0].message.content, persona);
}

// Util
export function updateThreadMetrics(thread: Thread): void {
  let metrices: Array<ItemMetrics> = [thread.post.metrics];
  if (thread.replies != null)
    metrices = metrices.concat(thread.replies.map((item) => item.metrics));
  thread.metrics = aggregateItemMetrics(metrices);
}

import _ from "lodash";
import { computed } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import { logger } from "@nanostores/logger";

import {
  type ItemEvaluation,
  getItemEvaluation,
  aggItemsEvaluation,
} from "@logic/evaluation";
import { classify } from "@api/classify";

import { STORE_PARSER } from "@stores/_constants";
import { personaUserStore, type Persona } from "@stores/personas";

// Type Definitions
export type ThreadItem = {
  icon: string;
  name: string;
  message: string;
  metrics: ItemEvaluation;
  model?: string;
};

export type Thread = {
  post: ThreadItem;
  replies?: Array<ThreadItem>;
  metrics: ItemEvaluation;
};

// Store Management
export const feedStore = persistentAtom<Array<Thread>>(
  "feed:",
  [],
  STORE_PARSER,
);

// Logger
logger({
  feedStore: feedStore,
});

// Derived Stores
export const reverseFeedStore = computed(
  feedStore,
  (feed: Array<Thread>): Array<Thread> => {
    const userName = personaUserStore.get()[0].name;
    const sorted = [...feed].reverse();
    const userThreads = sorted.filter((t) => t.post.name === userName);
    const otherThreads = sorted.filter((t) => t.post.name !== userName);
    return [...userThreads, ...otherThreads];
  },
);

export const rankedFeedStore = computed(
  feedStore,
  (feed: Array<Thread>): Array<Thread> => {
    const userName = personaUserStore.get()[0].name;
    const sorted = [...feed].sort((a, b) => b.metrics.score - a.metrics.score);
    const userThreads = sorted.filter((t) => t.post.name === userName);
    const otherThreads = sorted.filter((t) => t.post.name !== userName);
    return [...userThreads, ...otherThreads];
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

export async function post(
  message: string,
  persona: Persona = personaUserStore.get()[0],
  model?: string,
): Promise<void> {
  const classifyResult = await classify(message);

  addPost({
    icon: persona.icon,
    name: persona.name,
    message: message,
    metrics: getItemEvaluation(classifyResult[0]),
    model: model,
  });
}

export async function reply(
  threadID: number,
  message: string,
  persona: Persona = personaUserStore.get()[0],
  model?: string,
): Promise<void> {
  const classifyResult = await classify(message);

  addReply(threadID, {
    icon: persona.icon,
    name: persona.name,
    message: message,
    metrics: getItemEvaluation(classifyResult[0]),
    model: model,
  });
}

// Util
export function updateThreadMetrics(thread: Thread): void {
  let metrices: Array<ItemEvaluation> = [thread.post.metrics];
  if (thread.replies != null)
    metrices = metrices.concat(thread.replies.map((item) => item.metrics));
  thread.metrics = aggItemsEvaluation(metrices);
}

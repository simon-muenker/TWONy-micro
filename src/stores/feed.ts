import _ from "lodash";
import { atom, computed } from "nanostores";

import { user, type Persona } from "@/personas";
import { createChat } from "@/prompts";

import { agentSettingsStore, rankingSettingsStore } from "@stores/config";

import { chat, metric, type MetricResult } from "@/api";

// Constants
export const EMOTIONS = {
  negative: ["anger", "fear", "pessimism"],
  positive: ["joy", "trust", "optimism"],
};

// Type Definitions
export type ThreadItem = {
  icon: string;
  name: string;
  message: string;
  metrics: {
    anger: number;
    fear: number;
    pessimism: number;
    joy: number;
    trust: number;
    optimism: number;
  };
};

export type ThreadMetrics = {
  negValence: number;
  posValence: number;
  score: number;
};

export type Thread = {
  post: ThreadItem;
  replies?: Array<ThreadItem>;
  metrics: ThreadMetrics;
};

// Utility
function createPost(
  persona: Persona,
  message: string,
  metric: MetricResult,
): ThreadItem {
  return {
    icon: persona.icon,
    name: persona.name,
    message: message,
    metrics: metric.predictions[0].results.emotions,
  };
}

function getThreadItemMetrics(item: ThreadItem): ThreadMetrics {
  let rank: ThreadMetrics = {
    negValence: 0,
    posValence: 0,
    score: 0,
  };

  Object.entries(item.metrics).forEach((obj) => {
    if (EMOTIONS.negative.includes(obj[0])) {
      rank.negValence += obj[1] / EMOTIONS.negative.length;
    } else if (EMOTIONS.positive.includes(obj[0])) {
      rank.posValence += obj[1] / EMOTIONS.positive.length;
    }
  });

  rank.score =
    (rank.negValence * (rankingSettingsStore.get().negativeWeight * 0.01) +
      rank.posValence * (rankingSettingsStore.get().positiveWeight * 0.01)) *
    0.5;

  return rank;
}

function getThreadMetrics(thread: Thread): ThreadMetrics {
  const threadLength: number = thread.replies?.length ?? 0;

  return (
    thread.replies?.reduce(
      (acc: ThreadMetrics, reply: ThreadItem): ThreadMetrics => {
        const replyRank = getThreadItemMetrics(reply);

        acc.negValence += replyRank.negValence / (threadLength + 1);
        acc.posValence += replyRank.posValence / (threadLength + 1);
        acc.score += replyRank.score / (threadLength + 1);

        return acc;
      },
      getThreadItemMetrics(thread.post),
    ) ?? getThreadItemMetrics(thread.post)
  );
}

// Store Management
export const feedStore = atom<Array<Thread>>([]);

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

export const feedAvgMetricsStore = computed(
  feedStore,
  (feed: Array<Thread>): ThreadMetrics => {
    return {
      negValence: _.meanBy(feed, "metrics.negValence"),
      posValence: _.meanBy(feed, "metrics.posValence"),
      score: _.meanBy(feed, "metrics.score"),
    };
  },
);

export const nameAvgMetricsStore = computed(
  threadItemsByNameStore,
  (
    records: Record<string, Array<ThreadItem>>,
  ): Record<string, ThreadMetrics> => {
    return _.mapValues(records, (items: Array<ThreadItem>): ThreadMetrics => {
      const metrics = items.map((item) => getThreadItemMetrics(item));
      return {
        negValence: _.meanBy(metrics, "negValence"),
        posValence: _.meanBy(metrics, "posValence"),
        score: _.meanBy(metrics, "score"),
      };
    });
  },
);

// Modifiers
export function clearFeed(): void {
  feedStore.set([]);
}

export function pushToFeed(thread: Thread): void {
  thread.metrics = getThreadMetrics(thread);
  feedStore.set([...feedStore.get(), thread]);
}

export function addPost(item: ThreadItem): void {
  pushToFeed({
    post: item,
    metrics: { negValence: 0, posValence: 0, score: 0 },
  });
}

export function addReply(threadID: number, item: ThreadItem): void {
  let feed: Array<Thread> = feedStore.get();

  if (feed[threadID].replies) {
    feed[threadID].replies = [...feed[threadID].replies, item];
  } else {
    feed[threadID].replies = [item];
  }

  feed[threadID].metrics = getThreadMetrics(feed[threadID]);
  feedStore.set([...feed]);
}

// User Behavior
export async function userPost(
  message: string,
  persona: Persona = user,
): Promise<void> {
  const metricsResult = await metric(message);

  addPost(createPost(persona, message, metricsResult));
}

export async function userReply(
  threadID: number,
  message: string,
  persona: Persona = user,
): Promise<void> {
  const metricsResult = await metric(message);

  addReply(threadID, createPost(persona, message, metricsResult));
}

// Agent Behavior
export async function agentPost(persona: Persona): Promise<void> {
  const chatResult = await chat(
    agentSettingsStore.get().model,
    createChat(persona, "post", " "),
  );

  userPost(chatResult.response, persona);
}

export async function agentReply(
  threadID: number,
  persona: Persona,
): Promise<void> {
  const chatResult = await chat(
    agentSettingsStore.get().model,
    createChat(persona, "reply", feedStore.get()[threadID].post.message),
  );

  userReply(threadID, chatResult.response, persona);
}

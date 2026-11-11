import { atom, computed } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";

import {
  type ItemEvaluation,
  getItemEvaluation,
  aggItemsEvaluation,
  computeScore,
} from "@logic/evaluation";
import { classify } from "@api/classify";

import { STORE_PARSER } from "@stores/_constants";
import { devLogger } from "@stores/_logger";
import { personaUserStore, type Persona } from "@stores/personas";
import { settingsRankingStore } from "@stores/settings";

// Type Definitions
export type ThreadItem = {
  icon: string;
  name: string;
  message: string;
  metrics: ItemEvaluation;
  model?: string;
  /** Creation time (ms since epoch); missing on items stored by older versions. */
  createdAt?: number;
};

export type Thread = {
  post: ThreadItem;
  replies?: Array<ThreadItem>;
  metrics: ItemEvaluation;
};

export type DisplayThread = {
  /** Index of the thread in the feed store; stable while the feed is not cleared. */
  id: number;
  thread: Thread;
  /** Ranking score under the current ranking weights. */
  score: number;
  pinned: boolean;
};

// Store Management
export const feedStore = persistentAtom<Array<Thread>>(
  "feed:",
  [],
  STORE_PARSER,
);

export const isClassifyingStore = atom<boolean>(false);
let classifyingCount = 0;

function startClassifying() {
  classifyingCount++;
  isClassifyingStore.set(true);
}

function stopClassifying() {
  classifyingCount--;
  if (classifyingCount <= 0) {
    classifyingCount = 0;
    isClassifyingStore.set(false);
  }
}

// Incremented whenever the feed is cleared, so results of requests that were
// still in flight at that moment can be discarded instead of re-populating it.
let feedEpoch = 0;

export function getFeedEpoch(): number {
  return feedEpoch;
}

// Logger
devLogger({
  feedStore: feedStore,
});

// Derived Stores

/**
 * The feed in display order: the user's own threads are pinned to the top,
 * the rest is ordered by the selected ranker. Scores are derived from the
 * current ranking weights, so changing them re-ranks the existing feed.
 */
export const displayFeedStore = computed(
  [feedStore, settingsRankingStore, personaUserStore],
  (feed, ranking, user): Array<DisplayThread> => {
    const userName = user[0]?.name;

    const threads: Array<DisplayThread> = feed.map((thread, id) => ({
      id,
      thread,
      score: computeScore(thread.metrics.classes, ranking),
      pinned: thread.post.name === userName,
    }));

    // newest first; ties in the sentiment ranking keep this order (stable sort)
    threads.reverse();
    if (ranking.sentimentBased) threads.sort((a, b) => b.score - a.score);

    return [
      ...threads.filter((t) => t.pinned),
      ...threads.filter((t) => !t.pinned),
    ];
  },
);

/** All posts and replies in the order they were created. */
export const threadItemStore = computed(
  feedStore,
  (feed: Array<Thread>): Array<ThreadItem> => {
    return feed
      .flatMap((thread) => [thread.post, ...(thread.replies ?? [])])
      .sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0));
  },
);

// Modifiers
export function clearFeed(): void {
  feedEpoch++;
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
  const feed: Array<Thread> = feedStore.get();
  const thread: Thread | undefined = feed[threadID];
  if (!thread) return;

  const updated: Thread = {
    ...thread,
    replies: [...(thread.replies ?? []), item],
  };
  updateThreadMetrics(updated);

  feedStore.set(feed.map((t, id) => (id === threadID ? updated : t)));
}

async function createItem(
  message: string,
  persona: Persona,
  model?: string,
): Promise<ThreadItem | null> {
  const epoch = feedEpoch;

  startClassifying();
  try {
    const classifyResult = await classify(message);

    // the feed was reset while the request was in flight
    if (epoch !== feedEpoch) return null;

    return {
      icon: persona.icon,
      name: persona.name,
      message: message,
      metrics: getItemEvaluation(classifyResult[0] ?? []),
      model: model,
      createdAt: Date.now(),
    };
  } finally {
    stopClassifying();
  }
}

export async function post(
  message: string,
  persona: Persona = personaUserStore.get()[0],
  model?: string,
): Promise<void> {
  const item = await createItem(message, persona, model);
  if (item) addPost(item);
}

export async function reply(
  threadID: number,
  message: string,
  persona: Persona = personaUserStore.get()[0],
  model?: string,
): Promise<void> {
  const item = await createItem(message, persona, model);
  if (item) addReply(threadID, item);
}

// Util
export function updateThreadMetrics(thread: Thread): void {
  let metrices: Array<ItemEvaluation> = [thread.post.metrics];
  if (thread.replies != null)
    metrices = metrices.concat(thread.replies.map((item) => item.metrics));
  thread.metrics = aggItemsEvaluation(metrices);
}

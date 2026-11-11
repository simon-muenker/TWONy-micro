import { computed } from "nanostores";

import { mean } from "@common/util";

import { type ThreadItem, threadItemStore } from "@stores/feed";

// Type Definitions
export type SentimentPoint = {
  positive: number;
  negative: number;
};

export type UserSentiment = SentimentPoint & {
  icon: string;
  name: string;
  /** Number of posts and replies written by this user. */
  count: number;
};

// Derived Stores

/**
 * Average sentiment of the whole network after each item was added:
 * entry i is the mean over the first i + 1 posts and replies.
 */
export const networkHistoryStore = computed(
  threadItemStore,
  (items: Array<ThreadItem>): Array<SentimentPoint> => {
    let positive = 0;
    let negative = 0;

    return items.map((item, index) => {
      positive += item.metrics.classes.positive;
      negative += item.metrics.classes.negative;

      return {
        positive: positive / (index + 1),
        negative: negative / (index + 1),
      };
    });
  },
);

/** Average sentiment per user, in order of each user's first appearance. */
export const userSentimentStore = computed(
  threadItemStore,
  (items: Array<ThreadItem>): Array<UserSentiment> => {
    const byName = new Map<string, Array<ThreadItem>>();

    for (const item of items) {
      const group = byName.get(item.name);
      if (group) group.push(item);
      else byName.set(item.name, [item]);
    }

    return Array.from(byName, ([name, group]) => ({
      name,
      icon: group[0].icon,
      count: group.length,
      positive: mean(group.map((item) => item.metrics.classes.positive)),
      negative: mean(group.map((item) => item.metrics.classes.negative)),
    }));
  },
);

// Earlier versions persisted complete chart configurations; both charts are
// now derived from the feed, so drop the stale copies.
if (typeof localStorage !== "undefined") {
  try {
    localStorage.removeItem("networkMetrics:");
    localStorage.removeItem("userMetrics:");
  } catch {
    // storage unavailable (e.g. blocked by privacy settings) - nothing to clean
  }
}

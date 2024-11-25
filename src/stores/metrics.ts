import _ from "lodash";
import { atom } from "nanostores";

import { type ChartConfiguration } from "chart.js/auto";
import { getNetworkMetrics, getUserMetrics } from "@data/examples";
import type { Thread, ThreadItem } from "@/stores/feed";

const EMOTIONS = {
  negative: ["anger", "fear", "pessimism"],
  positive: ["joy", "trust", "optimism"],
};

type Ranking = {
  negativeValence: number;
  positiveValence: number;
  score: number;
};

export const networkMetricsStore = atom<ChartConfiguration>(
  getNetworkMetrics(1),
);

export const userMetricsStore = atom<ChartConfiguration>(getUserMetrics());

export function getThreadItemMetrics(item: ThreadItem): Ranking {
  let rank: Ranking = {
    negativeValence: 0,
    positiveValence: 0,
    score: 0,
  };

  Object.entries(item.metrics).forEach((obj) => {
    if (EMOTIONS.negative.includes(obj[0])) {
      rank.negativeValence += obj[1] / EMOTIONS.negative.length;
    } else if (EMOTIONS.positive.includes(obj[0])) {
      rank.positiveValence += obj[1] / EMOTIONS.positive.length;
    }
  });

  rank.score = (rank.negativeValence + rank.positiveValence) / 2;

  return rank;
}

export function getThreadMetrics(thread: Thread): Ranking {
  let rank: Ranking = getThreadItemMetrics(thread.post);

  if (thread.replies) {
    const threadLength = thread.replies.length;

    thread.replies.forEach((item: ThreadItem) => {
      let replyRank = getThreadItemMetrics(item);

      rank.negativeValence += replyRank.negativeValence / (threadLength + 1);
      rank.positiveValence += replyRank.positiveValence / (threadLength + 1);
      rank.score += replyRank.score / (threadLength + 1);
    });
  }

  return rank;
}

import { type ClassfiyResult, extractClassScore } from "@api/classify";

import { mean } from "@common/util";

import { settingsRankingStore, type SettingsRanking } from "@stores/settings";

export type SentimentClasses = {
  positive: number;
  negative: number;
};

export type ItemEvaluation = {
  score: number;
  classes: SentimentClasses;
};

/**
 * Ranking score of an item or thread. The score is linear in the sentiment
 * classes, so the score of averaged classes equals the average score.
 */
export function computeScore(
  classes: SentimentClasses,
  ranking: Pick<SettingsRanking, "positiveWeight" | "negativeWeight">,
): number {
  return (
    0.01 * ranking.positiveWeight * classes.positive +
    0.01 * ranking.negativeWeight * classes.negative
  );
}

export function getItemEvaluation(
  classes: Array<ClassfiyResult>,
): ItemEvaluation {
  const sentiment: SentimentClasses = {
    positive: extractClassScore("positive", classes),
    negative: extractClassScore("negative", classes),
  };

  return {
    score: computeScore(sentiment, settingsRankingStore.get()),
    classes: sentiment,
  };
}

export function aggItemsEvaluation(
  metrices: Array<ItemEvaluation>,
): ItemEvaluation {
  if (metrices.length === 1) return metrices[0];
  return {
    score: mean(metrices.map((m) => m.score)),
    classes: {
      positive: mean(metrices.map((m) => m.classes.positive)),
      negative: mean(metrices.map((m) => m.classes.negative)),
    },
  };
}

import _ from "lodash";

import { type ClassfiyResult, extractClassScore } from "@api/classify";

import {settingsRankingStore} from "@stores/settings"

export type ItemEvaluation = {
  score: number;
  classes: {
    positive: number;
    negative: number;
  };
};

export function getItemEvaluation(
  classes: Array<ClassfiyResult>,
): ItemEvaluation {
  let metrics: ItemEvaluation = {
    score: 0.0,
    classes: {
      positive: extractClassScore("positive", classes),
      negative: extractClassScore("negative", classes),
    },
  };

  metrics.score = (
    0.01 * settingsRankingStore.get().positiveWeight * metrics.classes.positive + 
    0.01 * settingsRankingStore.get().negativeWeight * metrics.classes.negative
  );

  return metrics;
}

export function aggItemsEvaluation(
  metrices: Array<ItemEvaluation>,
): ItemEvaluation {
  if (metrices.length === 1) return metrices[0];
  return {
    score: _.meanBy(metrices, "score"),
    classes: {
      positive: _.meanBy(metrices, "classes.positive"),
      negative: _.meanBy(metrices, "classes.negative"),
    },
  };
}

import _ from "lodash";

import { type ClassfiyResult, extractClassScore } from "@api/classify";

export type ItemMetrics = {
  score: number;
  classes: {
    positive: number;
    negative: number;
  };
};

export function calculateItemMetrics(
  classes: Array<ClassfiyResult>,
): ItemMetrics {
  let metrics: ItemMetrics = {
    score: 0.0,
    classes: {
      positive: extractClassScore("positive", classes),
      negative: extractClassScore("negative", classes),
    },
  };

  metrics.score = metrics.classes.positive + metrics.classes.negative;

  return metrics;
}

export function aggregateItemMetrics(
  metrices: Array<ItemMetrics>,
): ItemMetrics {
  if (metrices.length === 1) return metrices[0];

  console.debug(metrices);
  return {
    score: _.meanBy(metrices, "score"),
    classes: {
      positive: _.meanBy(metrices, "classes.positive"),
      negative: _.meanBy(metrices, "classes.negative"),
    },
  };
}

import _ from "lodash";
import { computed } from "nanostores";
import { persistentAtom } from "@nanostores/persistent";
import { logger } from "@nanostores/logger";
import { type ChartConfiguration } from "chart.js/auto";

import { userMetricsDefault } from "@presets/evaluation";
import { type ItemEvaluation, aggItemsEvaluation } from "@logic/evaluation";

import { STORE_PARSER } from "@stores/_constants";

import {
  type ThreadItem,
  threadItemStore,
  threadItemsByNameStore,
} from "@stores/feed";


export const userMetricsStore = persistentAtom<ChartConfiguration>(
  "userMetrics:",
  structuredClone(userMetricsDefault),
  STORE_PARSER,
);

export const threadItemAvgMetricsStore = computed(
  threadItemStore,
  (items: Array<ThreadItem>): ItemEvaluation => {
    return aggItemsEvaluation(items.map((item) => item.metrics));
  },
);

export const nameAvgMetricsStore = computed(
  threadItemsByNameStore,
  (
    records: Record<string, Array<ThreadItem>>,
  ): Record<string, ItemEvaluation> => {
    return _.mapValues(records, (items: Array<ThreadItem>): ItemEvaluation => {
      return aggItemsEvaluation(items.map((item) => item.metrics));
    });
  },
);

// Logger
logger({
  userMetricsStore: userMetricsStore,
});

// Modifiers
export function resetEvaluation(): void {
  userMetricsStore.set(structuredClone(userMetricsDefault));
}



export function userMetricAddObservation(
  metrics: Record<string, ItemEvaluation>,
): void {
  if (_.isEmpty(metrics)) return;

  const userMetrics = { ...userMetricsStore.get() };

  userMetrics.data.labels = Object.keys(metrics);

  userMetrics.data.datasets[0].data = Object.values(metrics).map(
    (metric) => metric.classes.positive,
  );
  userMetrics.data.datasets[1].data = Object.values(metrics).map(
    (metric) => metric.classes.negative,
  );

  userMetricsStore.set(userMetrics);
}

// Listeners
nameAvgMetricsStore.subscribe((metrics) => {
  userMetricAddObservation(metrics);
});

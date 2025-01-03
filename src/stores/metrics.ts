import _ from "lodash";
import { logger } from "@nanostores/logger";
import { atom } from "nanostores";
import { type ChartConfiguration } from "chart.js/auto";

import { networkMetricsDefault, userMetricsDefault } from "@presets/metrics";

import {
  type ThreadMetrics,
  feedAvgMetricsStore,
  nameAvgMetricsStore,
} from "@stores/feed";

// Store Management
export const networkMetricsStore = atom<ChartConfiguration>(
  structuredClone(networkMetricsDefault),
);
export const userMetricsStore = atom<ChartConfiguration>(
  structuredClone(userMetricsDefault),
);

// Logger
logger({
  networkMetricsStore: networkMetricsStore,
  userMetricsStore: userMetricsStore,
});

// Modifiers
export function resetMetrics(): void {
  networkMetricsStore.set(structuredClone(networkMetricsDefault));
  userMetricsStore.set(structuredClone(userMetricsDefault));
}

export function networkMetricsAddObservation(metrics: ThreadMetrics): void {
  if (isNaN(metrics.score)) return;

  const networkMetrics = { ...networkMetricsStore.get() };

  if (networkMetrics.data.labels) {
    networkMetrics.data.labels.push(networkMetrics.data.labels.length);
  }

  networkMetrics.data.datasets[0].data.push(metrics.posValence);
  networkMetrics.data.datasets[1].data.push(metrics.negValence);

  networkMetricsStore.set(networkMetrics);
}

export function userMetricAddObservation(
  metrics: Record<string, ThreadMetrics>,
): void {
  if (_.isEmpty(metrics)) return;

  const userMetrics = { ...userMetricsStore.get() };

  userMetrics.data.labels = Object.keys(metrics);

  userMetrics.data.datasets[0].data = Object.values(metrics).map(
    (metric) => metric.posValence,
  );
  userMetrics.data.datasets[1].data = Object.values(metrics).map(
    (metric) => metric.negValence,
  );

  userMetricsStore.set(userMetrics);
}

// Listeners
feedAvgMetricsStore.subscribe((metrics) => {
  networkMetricsAddObservation(metrics);
});

nameAvgMetricsStore.subscribe((metrics) => {
  userMetricAddObservation(metrics);
});

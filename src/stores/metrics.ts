import _ from "lodash";
import { atom } from "nanostores";
import { type ChartConfiguration } from "chart.js/auto";

import { METRIC_COLORS } from "@/constants";

import {
  type ThreadMetrics,
  feedAvgMetricsStore,
  nameAvgMetricsStore,
} from "@stores/feed";

// Constants
const networkMetricsDefault: ChartConfiguration = {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "positive valence",
        data: [0.0],
        fill: false,
        borderColor: METRIC_COLORS.positive,
        tension: 0.1,
      },
      {
        label: "negative valence",
        data: [0.0],
        fill: false,
        borderColor: METRIC_COLORS.negative,
        tension: 0.1,
      },
    ],
  },
};

const userMetricsDefault: ChartConfiguration = {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "positive valence",
        data: [],
        backgroundColor: METRIC_COLORS.positive,
      },
      {
        label: "negative valence",
        data: [],
        backgroundColor: METRIC_COLORS.negative,
      },
    ],
  },
  options: {
    indexAxis: "y",
  },
};

// Store Management
export const networkMetricsStore = atom<ChartConfiguration>(
  structuredClone(networkMetricsDefault),
);
export const userMetricsStore = atom<ChartConfiguration>(
  structuredClone(userMetricsDefault),
);

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

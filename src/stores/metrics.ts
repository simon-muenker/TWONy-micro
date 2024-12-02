import _ from "lodash";
import { atom } from "nanostores";
import { type ChartConfiguration } from "chart.js/auto";

import type { ThreadMetrics } from "./feed";

// Constants
const COLORS: Record<string, string> = {
  positive: "rgb(75, 192, 192)",
  negative: "rgb(255, 99, 132)",
};

// Store Management
export const networkMetricsStore = atom<ChartConfiguration>({
  type: "line",
  data: {
    labels: [0],
    datasets: [
      {
        label: "positive valence",
        data: [0.0],
        fill: false,
        borderColor: COLORS.positive,
        tension: 0.1,
      },
      {
        label: "negative valence",
        data: [0.0],
        fill: false,
        borderColor: COLORS.negative,
        tension: 0.1,
      },
    ],
  },
});

export const userMetricsStore = atom<ChartConfiguration>({
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "positive valence",
        data: [],
        backgroundColor: COLORS.positive,
      },
      {
        label: "negative valence",
        data: [],
        backgroundColor: COLORS.negative,
      },
    ],
  },
  options: {
    indexAxis: "y",
  },
});

// Modifiers
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

import { type ChartConfiguration } from "chart.js/auto";

import { METRIC_COLORS } from "@/constants";

export const networkMetricsDefault: ChartConfiguration = {
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

export const userMetricsDefault: ChartConfiguration = {
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

import { type ChartConfiguration } from "chart.js/auto";

import { METRIC_COLORS } from "@_constants";

export const networkMetricsDefault: ChartConfiguration = {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "positivity",
        data: [0.0],
        fill: false,
        borderColor: METRIC_COLORS.positive,
        tension: 0.1,
      },
      {
        label: "negativity",
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
        label: "positivity",
        data: [],
        backgroundColor: METRIC_COLORS.positive,
      },
      {
        label: "negativity",
        data: [],
        backgroundColor: METRIC_COLORS.negative,
      },
    ],
  },
  options: {
    indexAxis: "y",
  },
};

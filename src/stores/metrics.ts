import { type ChartConfiguration } from "chart.js/auto";

export const networkMetrics: ChartConfiguration = {
  type: "line",
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7],
    datasets: [
      {
        label: "positivity",
        data: [0.8, 0.85, 0.9, 0.6, 0.4, 0.3, 0.3],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "negativity",
        data: [0.4, 0.35, 0.5, 0.6, 0.8, 0.8, 0.85],
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  },
};

export const userMetrics: ChartConfiguration = {
  type: "bar",
  data: {
    labels: ["Human", "Bot 1", "Bot 2", "Bot 3", "Bot 4"],
    datasets: [
      {
        label: "positivity",
        data: [0.8, 0.85, 0.9, 0.6, 0.4, 0.3, 0.3],
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "negativity",
        data: [0.4, 0.35, 0.5, 0.6, 0.8, 0.8, 0.85],
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  },
  options: {
    indexAxis: "y",
  },
};

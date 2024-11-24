import _ from "lodash";

import { personas } from "./personas";

import { type ChartConfiguration } from "chart.js/auto";

export function getNetworkMetrics(length: number): ChartConfiguration {
  return {
    type: "line",
    data: {
      labels: _.range(1, length),
      datasets: [
        {
          label: "positive valence",
          data: new Array(length).fill(0).map((val) => val + _.random(true)),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        {
          label: "negative valence",
          data: new Array(length).fill(0).map((val) => val + _.random(true)),
          fill: false,
          borderColor: "rgb(255, 99, 132)",
          tension: 0.1,
        },
      ],
    },
  };
}

export function getUserMetrics(): ChartConfiguration {
  return {
    type: "bar",
    data: {
      labels: ["User", ...personas.map((persona) => persona.name)],
      datasets: [
        {
          label: "positive valence",
          data: new Array(7).fill(0).map((val) => val + _.random(true)),
          backgroundColor: "rgb(75, 192, 192)",
        },
        {
          label: "negative valence",
          data: new Array(7).fill(0).map((val) => val + _.random(true)),
          backgroundColor: "rgb(255, 99, 132)",
        },
      ],
    },
    options: {
      indexAxis: "y",
    },
  };
}

import _ from "lodash";

import { type ChartConfiguration } from "chart.js/auto";

import type { Thread } from "@stores/feed";

export const feed: Array<Thread> = [
  {
    post: {
      icon: "🤖",
      name: "robot",
      message:
        "Pellentesque vel mauris ultrices, imperdiet mauris eget, mattis dui. Nulla enim dolor, auctor elementum porta ut, gravida congue metus. Donec placerat convallis sapien, quis tincidunt arcu fermentum et.",
    },
    replies: [
      {
        icon: "🖲️",
        name: "trackball",
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum fermentum urna eget aliquam. Pellentesque vel mauris ultrices, imperdiet mauris eget, mattis dui.",
      },
    ],
  },
  {
    post: {
      icon: "🖲️",
      name: "trackball",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum fermentum urna eget aliquam. Pellentesque vel mauris ultrices, imperdiet mauris eget, mattis dui. Nulla enim dolor, auctor elementum porta ut, gravida congue metus. Donec placerat convallis sapien, quis tincidunt arcu fermentum et.",
    },
  },
  {
    post: {
      icon: "🖨️",
      name: "printer",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum fermentum urna eget aliquam.",
    },
    replies: [
      {
        icon: "🖲️",
        name: "trackball",
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum fermentum urna eget aliquam. Pellentesque vel mauris ultrices, imperdiet mauris eget, mattis dui.",
      },
      {
        icon: "🕹️",
        name: "joystick",
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum fermentum urna eget aliquam. Pellentesque vel mauris ultrices, imperdiet mauris eget, mattis dui.",
      },
    ],
  },
];

export function getNetworkMetrics(): ChartConfiguration {
  return {
    type: "line",
    data: {
      labels: [1, 2, 3, 4, 5, 6, 7],
      datasets: [
        {
          label: "positivity",
          data: _.shuffle([0.8, 0.85, 0.9, 0.6, 0.4, 0.3, 0.3]),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        {
          label: "negativity",
          data: _.shuffle([0.4, 0.35, 0.5, 0.6, 0.8, 0.8, 0.85]),
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
      labels: ["Human", "Bot 1", "Bot 2", "Bot 3", "Bot 4"],
      datasets: [
        {
          label: "positivity",
          data: _.shuffle([0.8, 0.85, 0.9, 0.6, 0.4, 0.3, 0.3]),
          backgroundColor: "rgb(75, 192, 192)",
        },
        {
          label: "negativity",
          data: _.shuffle([0.4, 0.35, 0.5, 0.6, 0.8, 0.8, 0.85]),
          backgroundColor: "rgb(255, 99, 132)",
        },
      ],
    },
    options: {
      indexAxis: "y",
    },
  };
}

export const PAGES: Array<{ icon: string; text: string; route: string }> = [
  {
    icon: "mdi:message-text-fast",
    text: "News Feed",
    route: "/TWONy-micro",
  },
  {
    icon: "mdi:swap-vertical",
    text: "Ranking Settings",
    route: "/TWONy-micro/ranking",
  },
  {
    icon: "mdi:account-group",
    text: "Agent Settings",
    route: "/TWONy-micro/agent",
  },
];

export const MODELS: Array<string> = [
  "llama3.1:8b-instruct-q6_K",
  "llama3.1:70b-instruct-q6_K",
  "mistral:7b-instruct-v0.2-q6_K",
] as const;

export const METRIC_EMOTIONS: Record<string, Array<string>> = {
  negative: ["anger", "fear", "pessimism"],
  positive: ["joy", "trust", "optimism"],
};

export const METRIC_COLORS: Record<string, string> = {
  positive: "rgb(75, 192, 192)",
  negative: "rgb(255, 99, 132)",
};

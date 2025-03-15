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
  "llama3.1:8b",
  "llama3.3:70b",
  "mistral:7b",
  "mistral-large:123b",
  "deepseek-r1:7b",
  "deepseek-r1:70b"
] as const;

export const METRIC_EMOTIONS: Record<string, Array<string>> = {
  negative: ["anger", "fear", "pessimism"],
  positive: ["joy", "trust", "optimism"],
};

export const METRIC_COLORS: Record<string, string> = {
  positive: "#059669",
  negative: "#e11d48",
};

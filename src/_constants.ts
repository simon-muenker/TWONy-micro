export const PAGES: Array<{
  icon: string;
  text: string;
  route: string;
  active: boolean;
}> = [
  {
    icon: "mdi:information-outline",
    text: "Introduction",
    route: "/TWONy-micro",
    active: true,
  },
  {
    icon: "mdi:message-text-fast",
    text: "News Feed",
    route: "/TWONy-micro/feed",
    active: true,
  },
  {
    icon: "mdi:swap-vertical",
    text: "Ranking Settings",
    route: "/TWONy-micro/ranking",
    active: true,
  },
  {
    icon: "mdi:account-group",
    text: "Agent Settings",
    route: "/TWONy-micro/agent",
    active: true,
  },
];

export const MODELS: Array<string> = [
  "Qwen/Qwen3-4B-Instruct-2507",
  "meta-llama/Llama-3.1-8B-Instruct",
  "google/gemma-2-9b-it",
  "openai/gpt-oss-20b",
];

export const METRIC_COLORS: Record<string, string> = {
  positive: "#059669",
  negative: "#e11d48",
};

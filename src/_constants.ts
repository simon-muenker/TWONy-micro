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
    text: "Simulation",
    route: "/TWONy-micro/simulation",
    active: true,
  },
  {
    icon: "mdi:swap-vertical",
    text: "Ranker",
    route: "/TWONy-micro/ranker",
    active: true,
  },
  {
    icon: "mdi:account-group",
    text: "Agents",
    route: "/TWONy-micro/agents",
    active: true,
  },
];

export const MODELS: Array<string> = [
  "meta-llama/Llama-3.2-3B-Instruct",
  "meta-llama/Llama-3.1-8B-Instruct",
  "meta-llama/Llama-3.3-70B-Instruct",
  "google/gemma-2-9b-it",
  "google/gemma-3-27b-it",
  "mistralai/Mistral-7B-Instruct-v0.3",
  "mistralai/Mixtral-8x7B-Instruct-v0.1",
  "Qwen/Qwen3-4B-Instruct-2507",
  "Qwen/Qwen3-235B-A22B-Instruct-2507",
  "openai/gpt-oss-20b",
  "openai/gpt-oss-120b",
];

export const METRIC_COLORS: Record<string, string> = {
  positive: "#059669",
  negative: "#e11d48",
};

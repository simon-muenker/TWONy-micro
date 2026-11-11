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

export const MODELS: readonly string[] = [
  "mixer",
  "assigned",
  "meta-llama/Llama-3.2-3B-Instruct",
  "meta-llama/Llama-3.1-8B-Instruct",
  "meta-llama/Llama-3.3-70B-Instruct",
  "google/gemma-2-9b-it",
  "google/gemma-3-27b-it",
  "Qwen/Qwen3-4B-Instruct-2507",
  "Qwen/Qwen3-235B-A22B-Instruct-2507",
  "openai/gpt-oss-20b",
  "openai/gpt-oss-120b",
];

// Sentiment colors (Tailwind teal-600 / rose-600). The pair is validated to
// stay distinguishable under red-green color vision deficiency; keep it in
// sync with the `.circle` classes in src/styles/fragments.css.
export const METRIC_COLORS = {
  positive: "#0d9488",
  negative: "#e11d48",
} as const;

import { persistentMap } from "@nanostores/persistent";

export const MODELS = [
  "llama3.1:8b-instruct-q6_K",
  "llama3.1:70b-instruct-q6_K",
  "mistral:7b-instruct-v0.2-q6_K",
] as const;

export type SimulationSettings = {
  running: boolean;
  tickTime: number;
  maxThreads: number;
};

export type AgentSettings = {
  model: (typeof MODELS)[number];
  postProp: number;
  replyProp: number;
};

export type rankingSettings = {
  emotionBased: boolean;
  positiveWeight: number;
  negativeWeight: number;
};

const PARSER = {
  encode: JSON.stringify,
  decode: JSON.parse,
};

export const simulationSettingsStore = persistentMap<SimulationSettings>(
  "simulationSettings:",
  {
    running: false,
    tickTime: 4000,
    maxThreads: 20,
  },
  PARSER,
);

export const agentSettingsStore = persistentMap<AgentSettings>(
  "agentSettings:",
  {
    model: "llama3.1:8b-instruct-q6_K",
    postProp: 0.3,
    replyProp: 0.7,
  },
  PARSER,
);

export const rankingSettingsStore = persistentMap<rankingSettings>(
  "rankingSettings:",
  {
    emotionBased: true,
    positiveWeight: 100,
    negativeWeight: 100,
  },
  PARSER,
);

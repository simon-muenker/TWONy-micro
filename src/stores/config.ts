import { persistentMap } from "@nanostores/persistent";

import { MODELS } from "@/constants";
import { STORE_PARSER } from "@/stores/constants";

export type SettingsSimulation = {
  running: boolean;
  tickTime: number;
  maxThreads: number;
};

export type SettingsAgent = {
  model: (typeof MODELS)[number];
  postProp: number;
  replyProp: number;
};

export type SettingsRanking = {
  emotionBased: boolean;
  positiveWeight: number;
  negativeWeight: number;
};

export const settingsSimulationStore = persistentMap<SettingsSimulation>(
  "settingsSimulation:",
  {
    running: false,
    tickTime: 4000,
    maxThreads: 20,
  },
  STORE_PARSER,
);

export const settingsAgentStore = persistentMap<SettingsAgent>(
  "settingsAgent:",
  {
    model: "llama3.1:8b-instruct-q6_K",
    postProp: 0.3,
    replyProp: 0.7,
  },
  STORE_PARSER,
);

export const settingsRankingStore = persistentMap<SettingsRanking>(
  "settingsRanking:",
  {
    emotionBased: true,
    positiveWeight: 100,
    negativeWeight: 100,
  },
  STORE_PARSER,
);

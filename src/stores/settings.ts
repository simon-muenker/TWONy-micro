import { logger } from "@nanostores/logger";
import { persistentMap } from "@nanostores/persistent";

import { MODELS } from "@constants";
import { STORE_PARSER } from "@stores/constants";

import {
  settingsSimulationDefault,
  settingsAgentDefault,
  settingsRankingDefault,
} from "@presets/settings";

// Type Definitions
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

// Store Management
export const settingsSimulationStore = persistentMap<SettingsSimulation>(
  "settingsSimulation:",
  settingsSimulationDefault,
  STORE_PARSER,
);

export const settingsAgentStore = persistentMap<SettingsAgent>(
  "settingsAgent:",
  settingsAgentDefault,
  STORE_PARSER,
);

export const settingsRankingStore = persistentMap<SettingsRanking>(
  "settingsRanking:",
  settingsRankingDefault,
  STORE_PARSER,
);

logger({
  settingsSimulationStore: settingsSimulationStore,
  settingsAgentStore: settingsAgentStore,
  settingsRankingStore: settingsRankingStore,
});

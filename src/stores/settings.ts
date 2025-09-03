import { logger } from "@nanostores/logger";
import { persistentMap } from "@nanostores/persistent";

import { MODELS } from "@_constants";
import { STORE_PARSER } from "@stores/_constants";

import {
  settingsSimulationDefault,
  settingsAgentDefault,
  settingsRankingDefault,
} from "@presets/settings";

// Type Definitions
export type SettingsSimulation = {
  apiKey: string | undefined;
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
  sentimentBased: boolean;
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

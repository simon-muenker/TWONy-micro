import { MODELS } from "@_constants";

import type {
  SettingsSimulation,
  SettingsAgent,
  SettingsRanking,
} from "@stores/settings";

export const settingsSimulationDefault: SettingsSimulation = {
  apiKey: undefined,
  running: false,
  tickTime: 2000,
  maxThreads: 20,
};

export const settingsAgentDefault: SettingsAgent = {
  model: MODELS[0],
  postProp: 0.2,
  replyProp: 0.8,
};

export const settingsRankingDefault: SettingsRanking = {
  sentimentBased: true,
  positiveWeight: 100,
  negativeWeight: 100,
};

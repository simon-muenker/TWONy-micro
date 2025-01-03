import type {
  SettingsSimulation,
  SettingsAgent,
  SettingsRanking,
} from "@stores/settings";

export const settingsSimulationDefault: SettingsSimulation = {
  running: false,
  tickTime: 4000,
  maxThreads: 20,
};

export const settingsAgentDefault: SettingsAgent = {
  model: "llatma3.1:8b-instruct-q6_K",
  postProp: 0.3,
  replyProp: 0.7,
};

export const settingsRankingDefault: SettingsRanking = {
  emotionBased: true,
  positiveWeight: 100,
  negativeWeight: 100,
};

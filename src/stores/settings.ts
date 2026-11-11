import { persistentMap } from "@nanostores/persistent";

import { MODELS } from "@_constants";
import { STORE_PARSER } from "@stores/_constants";
import { devLogger } from "@stores/_logger";

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

// A previously selected model may no longer be offered.
if (!MODELS.includes(settingsAgentStore.get().model)) {
  settingsAgentStore.setKey("model", settingsAgentDefault.model);
}

if (typeof window !== "undefined") {
  const params = new URLSearchParams(window.location.search);
  const apiKey = params.get("apiKey");

  if (apiKey !== null) {
    settingsSimulationStore.setKey("apiKey", apiKey.trim());

    params.delete("apiKey");
    const nextQuery = params.toString();
    const nextUrl = `${window.location.pathname}${
      nextQuery ? `?${nextQuery}` : ""
    }${window.location.hash}`;
    window.history.replaceState(window.history.state, "", nextUrl);
  }
}

devLogger({
  settingsSimulationStore: settingsSimulationStore,
  settingsAgentStore: settingsAgentStore,
  settingsRankingStore: settingsRankingStore,
});

import { persistentMap } from "@nanostores/persistent";

export type Config = {
  agents: {
    model: string;
    postProp: number;
    replyProp: number;
  };
  simulation: {
    tickTime: number;
    maxThreads: number;
  };
};

export type rankingSettings = {
  emotionBased: boolean;
  positiveWeight: number;
  negativeWeight: number;
};

export const config = persistentMap<Config>(
  "config:",
  {
    agents: {
      model: "llama3.1:8b-instruct-q6_K",
      postProp: 0.3,
      replyProp: 0.7,
    },
    simulation: {
      tickTime: 4000,
      maxThreads: 20,
    },
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

export const rankingSettingsStore = persistentMap<rankingSettings>(
  "rankingSettings:",
  {
    emotionBased: true,
    positiveWeight: 100,
    negativeWeight: 100,
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

export function setRankingSettingsEmotionBased(emotionBased: boolean): void {
  rankingSettingsStore.set({
    ...rankingSettingsStore.get(),
    emotionBased: emotionBased,
  });
}

export function setRankingSettingsPositiveWeight(weight: number): void {
  rankingSettingsStore.set({
    ...rankingSettingsStore.get(),
    positiveWeight: weight,
  });
}

export function setRankingSettingsNegativeWeight(weight: number): void {
  rankingSettingsStore.set({
    ...rankingSettingsStore.get(),
    negativeWeight: weight,
  });
}

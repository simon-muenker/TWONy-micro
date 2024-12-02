import { persistentMap } from "@nanostores/persistent";

export type Config = {
  agents: {
    model: string;
    postProp: number;
    replyProp: number;
  };
  simulation: {
    ranking: "chronological" | "emotion-based";
    tickTime: number;
    maxThreads: number;
  };
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
      ranking: "emotion-based",
      tickTime: 4000,
      maxThreads: 20,
    },
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

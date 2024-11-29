import { deepMap } from "nanostores";

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

export const config = deepMap<Config>({
  agents: {
    model: "llama3.1:8b-instruct-q6_K",
    postProp: 0.3,
    replyProp: 0.7,
  },
  simulation: {
    tickTime: 4000,
    maxThreads: 20,
  },
});

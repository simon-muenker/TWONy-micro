import { deepMap } from "nanostores";

export type Config = {
  agents: {
    model: string;
    post_prop: number;
    reply_prop: number;
  };
  simulation: {
    tick_time: number;
    max_threads: number;
  };
};

export const config = deepMap<Config>({
  agents: {
    model: "llama3.1:8b-instruct-q6_K",
    post_prop: 0.3,
    reply_prop: 0.7,
  },
  simulation: {
    tick_time: 4000,
    max_threads: 20,
  },
});

import _ from "lodash";

import { inference } from "./api";

import { getNetworkMetrics, getUserMetrics } from "@data/examples";

import { personas } from "@data/personas";
import {
  post_instruction,
  reply_instruction,
  systemAddPersona,
} from "@data/instructions";

import { feedStore, pushToFeed, addReply } from "@stores/feed";
import { networkMetricsStore, userMetricsStore } from "@stores/metrics";

const TICK_TIME: number = 4000;
const MAX_THREADS: number = 20;

const MODEL = "llama3.1:8b-instruct-q6_K";

async function run() {
  const feedLength: number = feedStore.get().length;

  if (feedLength < MAX_THREADS) {
    setTimeout(run, TICK_TIME);
  }

  const persona = _.sample(personas);
  if (!persona) return;

  await inference(MODEL, [
    systemAddPersona(post_instruction, persona.instruction),
    {
      content: "  ",
      role: "user",
    },
  ]).then((result) => {
    pushToFeed({
      post: {
        icon: persona.icon,
        name: persona.name,
        message: result.response,
      },
    });
  });

  if (feedLength > 0) {
    const selectedThreadID: number = _.random(feedLength);

    const persona = _.sample(personas);
    if (!persona) return;

    await inference(MODEL, [
      systemAddPersona(reply_instruction, persona.instruction),
      {
        content: feedStore.get()[selectedThreadID].post.message,
        role: "user",
      },
    ]).then((result) => {
      addReply(selectedThreadID, {
        icon: persona.icon,
        name: persona.name,
        message: result.response,
      });
    });
  }

  networkMetricsStore.set(getNetworkMetrics());
  userMetricsStore.set(getUserMetrics());
}
run();

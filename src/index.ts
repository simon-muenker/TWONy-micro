import _ from "lodash";

import { getNetworkMetrics, getUserMetrics } from "@data/examples";

import { agents, type Persona } from "@/personas";

import { config } from "./stores/config";
import { feedStore, agentPost, agentReply } from "@stores/feed";
import { networkMetricsStore, userMetricsStore } from "@stores/metrics";

function getRandomPersona(): Persona {
  return _.sample(agents) as Persona;
}

function choosePostParameters(): Persona {
  const persona = getRandomPersona();

  // do not post twice in a row
  if (feedStore.get().length > 0) {
    if (feedStore.get()[0].post.name == persona.name) {
      return choosePostParameters();
    }
  }

  return persona;
}

function chooseReplyParameters(feedLength: number): [number, Persona] {
  const selectedThreadID: number = _.random(feedLength - 1);
  const persona = getRandomPersona();

  const thread = feedStore.get()[selectedThreadID];

  // do not reply to your own post if there is no comment
  if (!thread.replies) {
    if (thread.post.name == persona.name) {
      return chooseReplyParameters(feedLength);
    }
  }

  // do not reply if the last comment was written by you
  if (thread.replies) {
    const lastReply = thread.replies.at(-1);

    if (lastReply && lastReply.name == persona.name) {
      return chooseReplyParameters(feedLength);
    }
  }

  return [selectedThreadID, persona];
}

let i: number = 1;
async function run() {
  const feedLength: number = feedStore.get().length;

  if (feedLength < config.get().simulation.max_threads) {
    setTimeout(run, config.get().simulation.tick_time);
  }

  if (_.random(true) < config.get().agents.post_prop) {
    await agentPost(choosePostParameters());
  }

  if (feedLength > 0 && _.random(true) < config.get().agents.reply_prop) {
    const replyParameters = chooseReplyParameters(feedLength);
    await agentReply(...replyParameters);
  }

  networkMetricsStore.set(getNetworkMetrics(i));
  userMetricsStore.set(getUserMetrics());
  i++;
}
run();

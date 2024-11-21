import _ from "lodash";

import { inference } from "./api";

import { getNetworkMetrics, getUserMetrics } from "@data/examples";

import { personas, type Persona } from "@data/personas";
import {
  post_instruction,
  reply_instruction,
  systemAddPersona,
} from "@data/instructions";

import { feedStore, pushToFeed, addReply } from "@stores/feed";
import { networkMetricsStore, userMetricsStore } from "@stores/metrics";

const TICK_TIME: number = 4000;
const MAX_THREADS: number = 10;

const POST_PROP: number = 0.3;
const REPLY_PROP: number = 0.7;

const MODEL = "llama3.1:8b-instruct-q6_K";

async function post(persona: Persona) {
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
}

async function reply(threadID: number, persona: Persona) {
  await inference(MODEL, [
    systemAddPersona(reply_instruction, persona.instruction),
    {
      content: feedStore.get()[threadID].post.message,
      role: "user",
    },
  ]).then((result) => {
    addReply(threadID, {
      icon: persona.icon,
      name: persona.name,
      message: result.response,
    });
  });
}

function getRandomPersona(): Persona {
  return _.sample(personas) as Persona;
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

let i: number = 1
async function run() {
  const feedLength: number = feedStore.get().length;

  if (feedLength < MAX_THREADS) {
    setTimeout(run, TICK_TIME);
  }

  if (_.random(true) < POST_PROP) {
    await post(choosePostParameters());
  }

  if (feedLength > 0 && _.random(true) < REPLY_PROP) {
    const replyParameters = chooseReplyParameters(feedLength);
    await reply(...replyParameters);
  }

  networkMetricsStore.set(getNetworkMetrics(i));
  userMetricsStore.set(getUserMetrics());
  i++;
}
run();

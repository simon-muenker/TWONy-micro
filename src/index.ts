import _ from "lodash";

import { agents, type Persona } from "@/personas";

import { config, rankingSettingsStore } from "./stores/config";
import { feedStore, agentPost, agentReply } from "@stores/feed";

function getRandomPersona(): Persona {
  return _.sample(agents) as Persona;
}

function choosePostParameters(): Persona {
  const lastPost = feedStore.get()[0]?.post;
  const persona = getRandomPersona();

  // do not post twice in a row
  if (lastPost && lastPost.name == persona.name) {
    return choosePostParameters();
  }

  return persona;
}

function chooseReplyParameters(feedLength: number): [number, Persona] {
  const selectedThreadID: number = _.random(_.floor((feedLength - 1) / 2));
  const persona = getRandomPersona();

  const thread = feedStore.get()[selectedThreadID];

  // do not reply to your own post if there is no comment
  if (!thread.replies && thread.post.name == persona.name) {
    return chooseReplyParameters(feedLength);
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

console.debug(rankingSettingsStore.get());

let i: number = 1;
async function run() {
  const feedLength: number = feedStore.get().length;

  if (feedLength < config.get().simulation.maxThreads) {
    setTimeout(run, config.get().simulation.tickTime);
  }

  if (_.random(true) < config.get().agents.postProp) {
    await agentPost(choosePostParameters());
  }

  if (feedLength > 0 && _.random(true) < config.get().agents.replyProp) {
    const replyParameters = chooseReplyParameters(feedLength);
    await agentReply(...replyParameters);
  }
  i++;
}
run();

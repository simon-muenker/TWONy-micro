import _ from "lodash";

import { settingsAgentStore, settingsSimulationStore } from "@/stores/settings";
import { getRandomActivePersona, type Persona } from "@stores/personas";
import { feedStore } from "@stores/feed";

import { agentPost, agentReply } from "@logic/agent";

function choosePostParameters(): Persona {
  const lastPost = feedStore.get()[0]?.post;
  const persona = getRandomActivePersona();

  // do not post twice in a row
  if (lastPost && lastPost.name == persona.name) {
    return choosePostParameters();
  }

  return persona;
}

function chooseReplyParameters(feedLength: number): [number, Persona] {
  const selectedThreadID: number = _.random(_.floor((feedLength - 1) / 2));
  const persona = getRandomActivePersona();

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

async function run() {
  const feedLength: number = feedStore.get().length;

  if (
    settingsSimulationStore.get().running &&
    feedLength < settingsSimulationStore.get().maxThreads
  ) {
    setTimeout(run, settingsSimulationStore.get().tickTime);
  }

  if (_.random(true) < settingsAgentStore.get().postProp) {
    await agentPost(choosePostParameters());
  }

  if (feedLength > 0 && _.random(true) < settingsAgentStore.get().replyProp) {
    const replyParameters = chooseReplyParameters(feedLength);
    await agentReply(...replyParameters);
  }
}

// Listeners
settingsSimulationStore.subscribe(() => {
  if (settingsSimulationStore.get().running) {
    run();
  }
});

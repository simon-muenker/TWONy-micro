import _ from "lodash";

import { settingsAgentStore, settingsSimulationStore } from "@/stores/settings";
import { getRandomActivePersona, personaUserStore, type Persona } from "@stores/personas";
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
  const persona = getRandomActivePersona();
  const feed = feedStore.get();

  let selectedThreadID: number;
  const userName = personaUserStore.get()[0].name;

  // Collect indices of all threads created by the user
  const userThreadIndices = feed.map((t, i) => t.post.name === userName ? i : -1).filter(i => i !== -1);

  // 50% chance to select a user's post if one exists
  if (userThreadIndices.length > 0 && Math.random() < 0.5) {
    selectedThreadID = _.sample(userThreadIndices) as number;
  } else {
    selectedThreadID = Math.min(_.random(feedLength - 1), _.random(feedLength - 1));
  }

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

let isRunningTick = false;

async function run() {
  if (isRunningTick) return;
  isRunningTick = true;

  try {
    const feedLength: number = feedStore.get().length;

    // Check maximum threads rule before we start processing tasks
    if (feedLength >= settingsSimulationStore.get().maxThreads) {
      return;
    }

    if (_.random(true) < settingsAgentStore.get().postProp) {
      await agentPost(choosePostParameters());
    }

    if (feedLength > 0 && _.random(true) < settingsAgentStore.get().replyProp) {
      const replyParameters = chooseReplyParameters(feedLength);
      await agentReply(...replyParameters);
    }
  } finally {
    isRunningTick = false;

    // Only schedule the next tick when the previous network calls are truly done
    const newFeedLength: number = feedStore.get().length;
    if (
      settingsSimulationStore.get().running &&
      newFeedLength < settingsSimulationStore.get().maxThreads
    ) {
      setTimeout(run, settingsSimulationStore.get().tickTime);
    }
  }
}

// Listeners
settingsSimulationStore.subscribe(() => {
  if (settingsSimulationStore.get().running) {
    run();
  }
});

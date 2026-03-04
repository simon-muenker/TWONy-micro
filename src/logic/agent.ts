import _ from "lodash";
import { MODELS } from "@/_constants";

import { chat } from "@api/chat";

import { post, reply, feedStore } from "@stores/feed";
import { type Persona } from "@stores/personas";
import { createChat } from "@stores/instructions";
import { settingsAgentStore } from "@stores/settings";

// Agent Behavior
export async function agentPost(persona: Persona): Promise<void> {
  let model = settingsAgentStore.get().model;
  if (model === "mixer") {
    const validModels = MODELS.filter((m) => m !== "mixer");
    model = _.sample(validModels) as string;
  }

  const chatResult = await chat(
    model,
    createChat(persona, "post", " "),
  );

  post(chatResult.choices[0].message.content, persona, model);
}

export async function agentReply(
  threadID: number,
  persona: Persona,
): Promise<void> {
  const thread = feedStore.get()[threadID];

  let numberComments: number = 5;
  let message = `post: ${thread.post.message} by ${thread.post.name}\n`;

  if (thread.replies != null) {
    if (thread.replies.length < 4) numberComments = thread.replies.length;
    _.takeRight(thread.replies, numberComments).forEach((item) => {
      message.concat(`comment: ${item.message} by ${item.name}\n`);
    });
  }

  let model = settingsAgentStore.get().model;
  if (model === "mixer") {
    const validModels = MODELS.filter((m) => m !== "mixer");
    model = _.sample(validModels) as string;
  }

  const chatResult = await chat(
    model,
    createChat(persona, "reply", message),
  );

  reply(threadID, chatResult.choices[0].message.content, persona, model);
}

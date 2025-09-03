import _ from "lodash";

import { chat } from "@api/chat";

import { post, reply, feedStore } from "@stores/feed";
import { type Persona } from "@stores/personas";
import { createChat } from "@stores/instructions";
import { settingsAgentStore } from "@stores/settings";

// Agent Behavior
export async function agentPost(persona: Persona): Promise<void> {
  const chatResult = await chat(
    settingsAgentStore.get().model,
    createChat(persona, "post", " "),
  );

  post(chatResult.choices[0].message.content, persona);
}

export async function agentReply(
  threadID: number,
  persona: Persona,
): Promise<void> {
  const chatResult = await chat(
    settingsAgentStore.get().model,
    createChat(persona, "reply", feedStore.get()[threadID].post.message),
  );

  reply(threadID, chatResult.choices[0].message.content, persona);
}

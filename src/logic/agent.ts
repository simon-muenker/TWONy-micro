import _ from "lodash";
import { MODELS } from "@/_constants";

import { chat } from "@api/chat";

import { post, reply, feedStore } from "@stores/feed";
import { type Persona } from "@stores/personas";
import { createChat } from "@stores/instructions";
import { settingsAgentStore } from "@stores/settings";

// Agent Behavior
const assignedModels = new Map<string, string>();

export function resetAssignedModels(): void {
  assignedModels.clear();
}

function resolveModelForAgent(model: string, persona: Persona): string {
  if (model === "mixer") {
    const validModels = MODELS.filter((m) => m !== "mixer" && m !== "assigned");
    return _.sample(validModels) as string;
  }

  if (model === "assigned") {
    if (!assignedModels.has(persona.name)) {
      const validModels = MODELS.filter((m) => m !== "mixer" && m !== "assigned");
      const usedModels = Array.from(assignedModels.values());
      const availableModels = validModels.filter(m => !usedModels.includes(m));

      const poolToSampleFrom = availableModels.length > 0 ? availableModels : validModels;
      assignedModels.set(persona.name, _.sample(poolToSampleFrom) as string);
    }
    return assignedModels.get(persona.name) as string;
  }

  return model;
}

export async function agentPost(persona: Persona): Promise<void> {
  const model = resolveModelForAgent(settingsAgentStore.get().model, persona);

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

  const model = resolveModelForAgent(settingsAgentStore.get().model, persona);

  const chatResult = await chat(
    model,
    createChat(persona, "reply", message),
  );

  reply(threadID, chatResult.choices[0].message.content, persona, model);
}

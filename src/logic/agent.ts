import { MODELS } from "@/_constants";

import { chat } from "@api/chat";
import { ApiError } from "@api/client";

import { sample } from "@common/util";

import { post, reply, feedStore, getFeedEpoch } from "@stores/feed";
import { type Persona } from "@stores/personas";
import { createChat } from "@stores/instructions";
import { settingsAgentStore } from "@stores/settings";

// Number of most recent comments handed to an agent as context for a reply.
const REPLY_CONTEXT_SIZE = 5;

const CONCRETE_MODELS: readonly string[] = MODELS.filter(
  (m) => m !== "mixer" && m !== "assigned",
);

// Agent Behavior
const assignedModels = new Map<string, string>();

// Models the Hugging Face router rejected in this session (e.g. because no
// enabled inference provider serves them). They are skipped by "mixer" and
// "assigned" so a single unsupported model cannot stall the simulation.
const unavailableModels = new Set<string>();

export function resetAssignedModels(): void {
  assignedModels.clear();
  unavailableModels.clear();
}

function availableModels(): string[] {
  return CONCRETE_MODELS.filter((m) => !unavailableModels.has(m));
}

function resolveModelForAgent(model: string, persona: Persona): string {
  if (model !== "mixer" && model !== "assigned") return model;

  const candidates = availableModels();
  if (candidates.length === 0) {
    throw new ApiError(
      "None of the language models is available for your Hugging Face account.",
      400,
      "model_not_supported",
    );
  }

  if (model === "mixer") return sample(candidates) as string;

  const assigned = assignedModels.get(persona.name);
  if (assigned && !unavailableModels.has(assigned)) return assigned;

  const usedModels = new Set(assignedModels.values());
  const unusedModels = candidates.filter((m) => !usedModels.has(m));
  const choice = sample(
    unusedModels.length > 0 ? unusedModels : candidates,
  ) as string;

  assignedModels.set(persona.name, choice);
  return choice;
}

/** Strips reasoning blocks and wrapping quotes some models add to their answer. */
export function cleanMessage(content: string | null | undefined): string {
  return (content ?? "")
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .trim()
    .replace(/^["“”']+|["“”']+$/g, "")
    .trim();
}

/**
 * Generates a message with the configured model. With "mixer" or "assigned",
 * models that turn out to be unsupported are excluded and another one is tried.
 */
async function generate(
  persona: Persona,
  action: "post" | "reply",
  content: string,
): Promise<{ message: string; model: string }> {
  const setting = settingsAgentStore.get().model;
  const isPooled = setting === "mixer" || setting === "assigned";

  for (;;) {
    const model = resolveModelForAgent(setting, persona);

    try {
      const result = await chat(model, createChat(persona, action, content));
      const message = cleanMessage(result.choices?.[0]?.message?.content);

      if (message.length === 0) {
        throw new ApiError(
          `The model ${model} returned an empty message.`,
          502,
        );
      }
      return { message, model };
    } catch (error) {
      if (isPooled && error instanceof ApiError && error.isModelError) {
        unavailableModels.add(model);
        continue; // resolveModelForAgent throws once no model is left
      }
      throw error;
    }
  }
}

export async function agentPost(persona: Persona): Promise<void> {
  const epoch = getFeedEpoch();
  const { message, model } = await generate(persona, "post", " ");

  if (epoch !== getFeedEpoch()) return; // feed was reset in the meantime
  await post(message, persona, model);
}

export async function agentReply(
  threadID: number,
  persona: Persona,
): Promise<void> {
  const epoch = getFeedEpoch();
  const thread = feedStore.get()[threadID];
  if (!thread) return;

  let context = `post: ${thread.post.message} by ${thread.post.name}\n`;
  for (const item of (thread.replies ?? []).slice(-REPLY_CONTEXT_SIZE)) {
    context += `comment: ${item.message} by ${item.name}\n`;
  }

  const { message, model } = await generate(persona, "reply", context);

  if (epoch !== getFeedEpoch()) return; // feed was reset in the meantime
  await reply(threadID, message, persona, model);
}

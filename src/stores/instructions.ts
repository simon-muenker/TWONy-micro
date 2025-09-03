import { logger } from "@nanostores/logger";
import { persistentMap } from "@nanostores/persistent";

import type { ChatItem } from "@api/chat";

import { STORE_PARSER } from "@stores/_constants";
import type { Persona } from "@stores/personas";

import { instructionsDefault } from "@presets/instructions";

// Type Definitions
export type Instructions = {
  post: ChatItem;
  reply: ChatItem;
};

export function createChat(
  persona: Persona,
  action: "post" | "reply",
  content: string,
): Array<ChatItem> {
  return [
    {
      content: persona.instruction,
      role: "system",
    },
    {
      content: `${instructionsStore.get()[action].content}\n${content}`,
      role: "user",
    },
  ];
}

// Store Management
export const instructionsStore = persistentMap<Instructions>(
  "instructions:",
  instructionsDefault,
  STORE_PARSER,
);

// Logger
logger({
  instructionsStore: instructionsStore,
});

// Modifiers
export function resetInstructions(): void {
  instructionsStore.set(structuredClone(instructionsDefault));
}

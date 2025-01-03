import { logger } from "@nanostores/logger";
import { persistentMap } from "@nanostores/persistent";

import type { ChatItem } from "@api/inference";

import { STORE_PARSER } from "@stores/constants";
import type { Persona } from "@stores/personas";

import { instructionsDefault } from "@presets/instructions";

// Type Definitions
export type Instructions = {
  post: ChatItem;
  reply: ChatItem;
};

// Utility
export function extendChatItem(item: ChatItem, suffix: string): ChatItem {
  return {
    content: `${item.content} ${suffix}`,
    role: "system",
  };
}

export function createChat(
  persona: Persona,
  action: "post" | "reply",
  userContent: string,
): Array<ChatItem> {
  return [
    extendChatItem(
      {
        content: persona.instruction,
        role: "system",
      },
      instructionsStore.get()[action].content,
    ),
    {
      content: userContent,
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

import { logger } from "@nanostores/logger";
import { persistentMap } from "@nanostores/persistent";

import type { ChatItem } from "@/api/inference";

import { STORE_PARSER } from "@/stores/constants";
import type { Persona } from "@stores/personas";

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

// Constants
const instructionsDefault: Instructions = {
  post: {
    content: "Write a Tweet (max 20 words) about what concerns you currently.",
    role: "system",
  },
  reply: {
    content:
      "Reply to the following content with a Tweet (max 20 words) with respect to your interests.",
    role: "system",
  },
};

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
};
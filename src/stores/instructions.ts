import { persistentMap } from "@nanostores/persistent";

import type { ChatItem } from "@api/chat";

import { STORE_PARSER } from "@stores/_constants";
import { devLogger } from "@stores/_logger";
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

/** Type guard for uploaded instruction files. */
export function isInstructions(value: unknown): value is Instructions {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;

  return (["post", "reply"] as const).every((key) => {
    const item = candidate[key] as Partial<ChatItem> | undefined;
    return (
      typeof item === "object" &&
      item !== null &&
      typeof item.content === "string" &&
      typeof item.role === "string"
    );
  });
}

// Store Management
export const instructionsStore = persistentMap<Instructions>(
  "instructions:",
  instructionsDefault,
  STORE_PARSER,
);

// Logger
devLogger({
  instructionsStore: instructionsStore,
});

// Modifiers
export function resetInstructions(): void {
  instructionsStore.set(structuredClone(instructionsDefault));
}

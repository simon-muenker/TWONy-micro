import type { ChatItem } from "@/api";
import type { Persona } from "@/personas";

export const instructions: {
  post: ChatItem;
  reply: ChatItem;
} = {
  post: {
    content:
      "You are a social media user. Write a Tweet (max 20 words) about what concerns you currently.",
    role: "system",
  },
  reply: {
    content:
      "You are a social media user. Reply to the following content with a Tweet (max 20 words) with respect to your interests.",
    role: "system",
  },
};

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
    extendChatItem(instructions[action], persona.instruction),
    {
      content: userContent,
      role: "user",
    },
  ];
}

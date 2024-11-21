import type { Message } from "src/api";

export const post_instruction: Message = {
  content:
    "You are a social media user. Write a Tweet (max 20 words) about what concerns you currently.",
  role: "system",
};

export const reply_instruction: Message = {
  content:
    "You are a social media user. Reply to the following content with a Tweet (max 20 words) with respect to your interests.",
  role: "system",
};

export function systemAddPersona(
  instruction: Message,
  persona: string,
): Message {
  return {
    content: `${instruction.content} ${persona}`,
    role: "system",
  };
}

import { hfPost } from "@api/client";

export type ChatItem = {
  content: string;
  role: string;
};

export type ChatResultChoice = {
  index: number;
  message: ChatItem;
};

export type ChatResult = {
  id: string;
  model: string;
  choices: Array<ChatResultChoice>;
};

const CHAT_URL = "https://router.huggingface.co/v1/chat/completions";

export async function chat(
  model: string,
  messages: Array<ChatItem>,
): Promise<ChatResult> {
  return hfPost<ChatResult>(CHAT_URL, { model, messages });
}

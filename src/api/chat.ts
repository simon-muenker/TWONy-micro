import axios, { type AxiosInstance } from "axios";

import { HEADERS } from "@/api/constants";
import type { MODELS } from "@/constants";

export type ChatItem = {
  content: string;
  role: string;
};

export type ChatResult = {
  id: string;
  timestamp: string;
  model: string;
  chat: Array<ChatItem>;
  response: string;
};

const CHAT_ENDPOINT: AxiosInstance = axios.create({
  baseURL: "https://inf.cl.uni-trier.de",
  headers: HEADERS,
});

export async function chat(
  model: (typeof MODELS)[number],
  messages: Array<ChatItem>,
): Promise<ChatResult> {
  return await CHAT_ENDPOINT.post("/chat/", {
    model: model,
    messages: messages,
  })
    .then((result) => {
      console.debug(result);
      return result.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

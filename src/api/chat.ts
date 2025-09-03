import axios, { type AxiosInstance } from "axios";

import { HEADERS } from "@api/_constants";
import type { MODELS } from "@_constants";

import { settingsSimulationStore } from "@/stores/settings";

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

const INFERENCE_ENDPOINT: AxiosInstance = axios.create({
  baseURL: "https://router.huggingface.co/v1",
  headers: HEADERS,
  transformRequest: [
    function (data, headers) {
      headers["Authorization"] =
        `Bearer ${settingsSimulationStore.get().apiKey}`;
      return JSON.stringify(data);
    },
  ],
});

export async function chat(
  model: (typeof MODELS)[number],
  messages: Array<ChatItem>,
): Promise<ChatResult> {
  return await INFERENCE_ENDPOINT.post("/chat/completions", {
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

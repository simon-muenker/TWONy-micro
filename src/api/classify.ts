import axios, { type AxiosInstance } from "axios";

import { HEADERS } from "@api/_constants";

import { settingsSimulationStore } from "@/stores/settings";

export type ClassfiyResult = {
  label: string;
  score: number;
};

const CLASSIFY_ENDPOINT: AxiosInstance = axios.create({
  baseURL: "https://router.huggingface.co/hf-inference/models",
  headers: HEADERS,
  transformRequest: [
    function (data, headers) {
      headers["Authorization"] =
        `Bearer ${settingsSimulationStore.get().apiKey}`;
      return JSON.stringify(data);
    },
  ],
});

export async function classify(
  content: string | Array<string>,
  model: string = "/cardiffnlp/twitter-xlm-roberta-base-sentiment",
  parameters: object = {
    function_to_apply: "softmax",
    top_k: -1,
  },
): Promise<Array<Array<ClassfiyResult>>> {
  return await CLASSIFY_ENDPOINT.post(model, {
    inputs: content,
    parameters: parameters,
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

export function extractClassScore(
  label: string,
  choices: Array<ClassfiyResult>,
): number {
  const result: ClassfiyResult | undefined = choices.find(
    (x) => x.label === label,
  );

  if (result == null) return 0.0;
  return result.score;
}

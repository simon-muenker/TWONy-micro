import { hfPost } from "@api/client";

export type ClassfiyResult = {
  label: string;
  score: number;
};

const CLASSIFY_URL = "https://router.huggingface.co/hf-inference/models/";

export async function classify(
  content: string | Array<string>,
  model: string = "cardiffnlp/twitter-xlm-roberta-base-sentiment",
  parameters: object = {
    function_to_apply: "softmax",
    top_k: -1,
  },
): Promise<Array<Array<ClassfiyResult>>> {
  return hfPost<Array<Array<ClassfiyResult>>>(CLASSIFY_URL + model, {
    inputs: content,
    parameters: parameters,
  });
}

export function extractClassScore(
  label: string,
  choices: Array<ClassfiyResult>,
): number {
  return choices.find((x) => x.label === label)?.score ?? 0.0;
}

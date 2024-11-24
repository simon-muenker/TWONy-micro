import axios, { type AxiosInstance } from "axios";

export interface Message {
  content: string;
  role: string;
}

export interface InferenceResult {
  id: string;
  timestamp: string;
  model: string;
  prompt: Array<Message>;
  response: string;
}

export interface MetricResult {
  predictions: Array<{
    results: {
      topics: Object;
      emotions: {
        anger: number;
        fear: number;
        pessimism: number;
        joy: number;
        trust: number;
        optimism: number;
      };
      sentiment: Object;
      hate: Object;
      irony: Object;
      offensive: Object;
    };
    sample: string;
  }>;
}

const HEADERS: Object = {
  "Content-Type": "application/json; charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
};

const INFERENCE_ENDPOINT: AxiosInstance = axios.create({
  baseURL: "https://inf.cl.uni-trier.de",
  headers: HEADERS,
});

const METRIC_ENDPOINT: AxiosInstance = axios.create({
  baseURL: "https://metrics.twon.uni-trier.de",
  headers: HEADERS,
});

export async function inference(
  model: string,
  messages: Array<Message>,
): Promise<InferenceResult> {
  return await INFERENCE_ENDPOINT.post("/chat/", {
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

export async function metric(content: string): Promise<MetricResult> {
  return await METRIC_ENDPOINT.post("/", {
    samples: [content],
    threshold: 0.0,
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

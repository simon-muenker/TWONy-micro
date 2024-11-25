import axios, { type AxiosInstance } from "axios";

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

export type MetricResult = {
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
};

const HEADERS: Object = {
  "Content-Type": "application/json; charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
};

const MODEL_ENDPOINT: AxiosInstance = axios.create({
  baseURL: "https://inf.cl.uni-trier.de",
  headers: HEADERS,
});

const METRIC_ENDPOINT: AxiosInstance = axios.create({
  baseURL: "https://metrics.twon.uni-trier.de",
  headers: HEADERS,
});

export async function chat(
  model: string,
  messages: Array<ChatItem>,
): Promise<ChatResult> {
  return await MODEL_ENDPOINT.post("/chat/", {
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

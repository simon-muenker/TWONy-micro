import axios, { type AxiosInstance } from "axios";

import { HEADERS } from "@/api/constants";

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

const METRIC_ENDPOINT: AxiosInstance = axios.create({
  baseURL: "https://metrics.twon.uni-trier.de",
  headers: HEADERS,
});

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

import axios, { type AxiosInstance } from "axios";

export interface Message {
  content: string;
  role: string;
}

export interface Result {
  id: string;
  timestamp: string;
  model: string;
  prompt: Array<Message>;
  response: string;
}

const instance: AxiosInstance = axios.create({
  baseURL: "https://inf.cl.uni-trier.de",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
});

export async function inference(
  model: string,
  messages: Array<Message>,
): Promise<Result> {
  return await instance
    .post("/chat/", { model: model, messages: messages })
    .then((result) => {
      console.debug(result);
      return result.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

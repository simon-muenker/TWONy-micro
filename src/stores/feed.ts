import _ from "lodash";
import { atom } from "nanostores";

import { user, type Persona } from "@/personas";
import { createChat } from "@/prompts";

import { config } from "@stores/config";

import { chat, metric, type MetricResult } from "@/api";

export type ThreadItem = {
  icon: string;
  name: string;
  message: string;
  metrics: {
    anger: number;
    fear: number;
    pessimism: number;
    joy: number;
    trust: number;
    optimism: number;
  };
};

export type Thread = {
  post: ThreadItem;
  replies?: Array<ThreadItem>;
  metrics?: {
    negativeValence: number;
    positiveValence: number;
    ranking: number;
  };
};

export const feedStore = atom<Array<Thread>>([]);

export function pushToFeed(thread: Thread) {
  feedStore.set([thread, ...feedStore.get()]);
}

export function addReply(threadID: number, message: ThreadItem) {
  let feed: Array<Thread> = feedStore.get();

  if (feed[threadID].replies) {
    feed[threadID].replies = [...feed[threadID].replies, message];
  } else {
    feed[threadID].replies = [message];
  }

  feedStore.set([...feed]);
}

export async function agentPost(persona: Persona) {
  await chat(config.get().agents.model, createChat(persona, "post", " ")).then(
    async (result) => {
      await metric(result.response).then((metrics) => {
        pushToFeed({
          post: createPost(persona, result.response, metrics),
        });
      });
    },
  );
}

export async function agentReply(threadID: number, persona: Persona) {
  await chat(
    config.get().agents.model,
    createChat(persona, "reply", feedStore.get()[threadID].post.message),
  ).then(async (result) => {
    await metric(result.response).then((metrics) => {
      addReply(threadID, createPost(persona, result.response, metrics));
    });
  });
}

export async function userPost(message: string) {
  await metric(message).then((metrics) => {
    pushToFeed({
      post: createPost(user, message, metrics),
    });
  });
}

function createPost(
  persona: Persona,
  message: string,
  metric: MetricResult,
): ThreadItem {
  return {
    icon: persona.icon,
    name: persona.name,
    message: message,
    metrics: metric.predictions[0].results.emotions,
  };
}

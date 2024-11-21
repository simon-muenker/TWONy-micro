import _ from "lodash";
import { atom } from "nanostores";

export interface Message {
  icon: string;
  name: string;
  message: string;
  metrics?: {
    positivity: number;
    negativity: number;
    ranking: number;
  };
}

export interface Thread {
  post: Message;
  replies?: Array<Message>;
}

export const feedStore = atom<Array<Thread>>([]);

export function pushToFeed(thread: Thread) {
  feedStore.set([thread, ...feedStore.get()]);
}

export function addReply(threadID: number, message: Message) {
  let feed: Array<Thread> = feedStore.get();

  if (feed[threadID].replies) {
    feed[threadID].replies = [...feed[threadID].replies, message];
  } else {
    feed[threadID].replies = [message];
  }

  feedStore.set(feed);
}

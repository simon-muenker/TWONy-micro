import _ from "lodash";
import { atom } from "nanostores";

import { feed } from "@data/examples";

export type Message = {
  icon: string;
  name: string;
  message: string;
  metrics?: {
    positivity: number;
    negativity: number;
    ranking: number;
  };
};

export type Thread = {
  post: Message;
  replies?: Array<Message>;
};

export const feedStore = atom<Array<Thread>>([]);

export function addToFeed(thread: Thread) {
  feedStore.set([thread, ...feedStore.get()]);
}

function run() {
  if (feedStore.get().length < 10) {
    setTimeout(run, 4000);
  }

  let sample = _.sample(feed);
  if (sample) {
    addToFeed(sample);
  }
}
run();

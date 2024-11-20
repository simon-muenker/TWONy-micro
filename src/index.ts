import _ from "lodash";

import { feed, getNetworkMetrics } from "@data/examples";

import { addToFeed, feedStore } from "@stores/feed";
import { networkMetricsStore, userMetricsStore } from "@stores/metrics";

function run() {
  if (feedStore.get().length < 10) {
    setTimeout(run, 4000);
  }

  let sample = _.sample(feed);
  if (sample) {
    addToFeed(sample);
  }

  networkMetricsStore.set(getNetworkMetrics());
  console.log(getNetworkMetrics())
  userMetricsStore.set(getNetworkMetrics());
}
run();

import _ from "lodash";
import { atom, computed } from "nanostores";

import { type ChartConfiguration } from "chart.js/auto";
import { getNetworkMetrics, getUserMetrics } from "@data/examples";

export const networkMetricsStore = atom<ChartConfiguration>(
  getNetworkMetrics(1),
);

export const userMetricsStore = atom<ChartConfiguration>(getUserMetrics());

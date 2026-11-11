<script module lang="ts">
  import type { ChartData, ChartOptions } from "chart.js";

  import { METRIC_COLORS } from "@/_constants";

  import { downloadJSON } from "@common/jsonUtil";

  import {
    settingsRankingStore,
    settingsSimulationStore,
    settingsAgentStore,
  } from "@stores/settings";
  import { feedStore } from "@stores/feed";
  import { instructionsStore } from "@stores/instructions";
  import { personaAgentsStore } from "@stores/personas";
  import { networkHistoryStore, userSentimentStore } from "@stores/evaluation";

  import Chart from "@components/atoms/Chart.svelte";

  // chart surface (Tailwind slate-50) and inks
  const SURFACE = "#f8fafc";
  const INK = "#334155"; // slate-700
  const GRID = "#e2e8f0"; // slate-200
  const AXIS = "#94a3b8"; // slate-400

  const NETWORK_HEIGHT = 240;
  const USER_ROW_HEIGHT = 22;
  const USER_CHROME_HEIGHT = 84; // legend + x-axis
  const USER_LABEL_LENGTH = 16;

  function truncate(text: string, length: number): string {
    return text.length > length ? `${text.slice(0, length - 1)}…` : text;
  }

  const USER_EMPTY_ROWS = 3;
</script>

<script lang="ts">
  function downloadApplicationState(): void {
    // never export the API key
    const { apiKey: _apiKey, ...simulation } = $settingsSimulationStore;

    downloadJSON({
      settings: {
        simulation,
        agent: $settingsAgentStore,
        ranking: $settingsRankingStore,
      },
      feed: $feedStore,
      instructions: $instructionsStore,
      personas: Object.values($personaAgentsStore),
    });
  }

  // Network: running average sentiment after each post/reply
  let history = $derived($networkHistoryStore);
  let latest = $derived(history.at(-1));

  let networkData: ChartData = $derived.by(() => {
    const last = history.length - 1;

    const series = (label: string, color: string, values: number[]) => ({
      label,
      data: values,
      borderColor: color,
      backgroundColor: color,
      borderWidth: 2,
      borderJoinStyle: "round" as const,
      borderCapStyle: "round" as const,
      cubicInterpolationMode: "monotone" as const,
      // only the most recent value carries a marker
      pointRadius: (ctx: { dataIndex: number }) =>
        ctx.dataIndex === last ? 4 : 0,
      pointBorderColor: SURFACE,
      pointBorderWidth: 2,
      pointHoverRadius: 5,
      pointHoverBorderColor: SURFACE,
      pointHoverBorderWidth: 2,
    });

    return {
      labels: history.map((_, index) => index + 1),
      datasets: [
        series(
          "positivity",
          METRIC_COLORS.positive,
          history.map((p) => p.positive),
        ),
        series(
          "negativity",
          METRIC_COLORS.negative,
          history.map((p) => p.negative),
        ),
      ],
    };
  });

  const networkOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 250 },
    interaction: { mode: "index", intersect: false },
    scales: {
      x: {
        title: { display: true, text: "posts & replies in the feed" },
        grid: { display: false },
        border: { color: AXIS },
        ticks: { maxTicksLimit: 6, maxRotation: 0, autoSkipPadding: 12 },
      },
      y: {
        min: 0,
        max: 1,
        title: { display: true, text: "average score" },
        grid: { color: GRID },
        border: { display: false },
        ticks: {
          stepSize: 0.25,
          callback: (value) => Number(value).toFixed(2),
        },
      },
    },
    plugins: {
      // the line above the chart doubles as legend and shows the latest values
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (items) => {
            const count = Number(items[0]?.label ?? 0);
            return `after ${count} ${count === 1 ? "item" : "items"}`;
          },
          label: (item) =>
            ` ${item.dataset.label}: ${Number(item.parsed.y).toFixed(2)}`,
        },
      },
    },
  };

  // Users: diverging bars, negativity to the left and positivity to the right
  let users = $derived($userSentimentStore);

  let userData: ChartData = $derived({
    labels: users.map(
      (u) => `${u.icon} ${truncate(u.name, USER_LABEL_LENGTH)}`,
    ),
    datasets: [
      {
        label: "positivity",
        data: users.map((u) => u.positive),
        backgroundColor: METRIC_COLORS.positive,
      },
      {
        label: "negativity",
        data: users.map((u) => -u.negative),
        backgroundColor: METRIC_COLORS.negative,
      },
    ],
  });

  let userOptions: ChartOptions = $derived({
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 250 },
    datasets: {
      bar: {
        barThickness: 12,
        borderRadius: 4,
        borderSkipped: "start",
      },
    },
    scales: {
      x: {
        stacked: true,
        min: -1,
        max: 1,
        title: { display: true, text: "← negativity · positivity →" },
        grid: {
          color: (ctx) => (ctx.tick.value === 0 ? AXIS : GRID),
        },
        border: { display: false },
        ticks: {
          stepSize: 0.5,
          callback: (value) => Math.abs(Number(value)),
        },
      },
      y: {
        stacked: true,
        grid: { display: false },
        border: { display: false },
        ticks: { autoSkip: false, color: INK },
      },
    },
    plugins: {
      legend: {
        position: "top",
        align: "start",
        labels: {
          color: INK,
          usePointStyle: true,
          pointStyle: "rectRounded",
          boxWidth: 10,
          boxHeight: 8,
          padding: 12,
        },
      },
      tooltip: {
        callbacks: {
          title: (items) => {
            const user = users[items[0]?.dataIndex ?? -1];
            if (!user) return "";
            return `@${user.name} · ${user.count} ${user.count === 1 ? "item" : "items"}`;
          },
          label: (item) =>
            ` ${item.dataset.label}: ${Math.abs(Number(item.parsed.x)).toFixed(2)}`,
        },
      },
    },
  });

  let userHeight = $derived(
    USER_CHROME_HEIGHT +
      Math.max(users.length, USER_EMPTY_ROWS) * USER_ROW_HEIGHT,
  );
</script>

<section>
  <h3 class="sectionheading">Network Evaluation</h3>
  <p class="sectionnote mb-2">
    This graph tracks the overall emotional tone of your social network over
    time. Watch how it changes as the conversation evolves and how different
    rankers shift the balance.
  </p>
  <div class="rounded-xl bg-slate-50 p-3">
    <p
      class="mb-2 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-600 tabular-nums"
    >
      <span>
        <span class="circle green"></span>positivity
        <strong class="text-slate-900"
          >{latest ? latest.positive.toFixed(2) : "–"}</strong
        >
      </span>
      <span>
        <span class="circle red"></span>negativity
        <strong class="text-slate-900"
          >{latest ? latest.negative.toFixed(2) : "–"}</strong
        >
      </span>
      <span>
        <strong class="text-slate-900">{history.length}</strong>
        {history.length === 1 ? "item" : "items"}
      </span>
    </p>
    <div class="relative">
      <Chart
        type="line"
        data={networkData}
        options={networkOptions}
        height={NETWORK_HEIGHT}
        label={latest
          ? `Line chart of the network's average sentiment. After ${history.length} items: positivity ${latest.positive.toFixed(2)}, negativity ${latest.negative.toFixed(2)}.`
          : "Line chart of the network's average sentiment. No data yet."}
      />
      {#if !latest}
        <p
          class="pointer-events-none absolute inset-0 flex items-center justify-center px-12 text-center text-sm text-slate-500"
        >
          <span class="rounded-md bg-slate-50 px-2 py-1">
            No data yet. Start the simulation.
          </span>
        </p>
      {/if}
    </div>
  </div>
</section>

<section>
  <h3 class="sectionheading">User Evaluation</h3>
  <p class="sectionnote mb-2">
    This chart compares the average emotional tone of each participant. See
    which personas tend to be more positive or negative in their posts and
    replies.
  </p>
  <div class="rounded-xl bg-slate-50 p-3">
    <div class="relative">
      <Chart
        type="bar"
        data={userData}
        options={userOptions}
        height={userHeight}
        label={`Bar chart of the average positivity and negativity of ${users.length} participants. The values are listed in the data table below.`}
      />
      {#if users.length === 0}
        <p
          class="pointer-events-none absolute inset-0 flex items-center justify-center px-12 text-center text-sm text-slate-500"
        >
          <span class="rounded-md bg-slate-50 px-2 py-1">No data yet.</span>
        </p>
      {/if}
    </div>
    {#if users.length > 0}
      <details class="mt-2 text-xs text-slate-600">
        <summary class="cursor-pointer select-none">Show as table</summary>
        <table class="mt-2 w-full table-auto text-left tabular-nums">
          <thead>
            <tr class="border-b border-slate-200 text-slate-500">
              <th class="py-1 font-medium">participant</th>
              <th class="py-1 text-right font-medium">items</th>
              <th class="py-1 text-right font-medium">pos.</th>
              <th class="py-1 text-right font-medium">neg.</th>
            </tr>
          </thead>
          <tbody>
            {#each users as user (user.name)}
              <tr class="border-b border-slate-100">
                <td class="py-1 break-all">{user.icon} {user.name}</td>
                <td class="py-1 text-right">{user.count}</td>
                <td class="py-1 text-right">{user.positive.toFixed(2)}</td>
                <td class="py-1 text-right">{user.negative.toFixed(2)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </details>
    {/if}
  </div>
</section>

<section>
  <h3 class="mb-1 text-sm font-medium text-gray-900">Settings</h3>

  <table class="mb-6 w-full table-auto text-xs text-slate-600">
    <tbody>
      <tr>
        <td class="py-0.5">Ranking Type</td>
        <td class="py-0.5 font-mono"
          >{$settingsRankingStore.sentimentBased
            ? "Sentiment = po+ne"
            : "Chronological = new > old"}</td
        >
      </tr>
      {#if $settingsRankingStore.sentimentBased}
        <tr>
          <td class="py-0.5">
            Positivity Weight
            <span class="circle green ml-1"></span>
          </td>
          <td class="py-0.5 font-mono"
            >po * {($settingsRankingStore.positiveWeight * 0.01).toFixed(2)}</td
          >
        </tr>
        <tr>
          <td class="py-0.5">
            Negativity Weight
            <span class="circle red ml-1"></span>
          </td>
          <td class="py-0.5 font-mono"
            >ne * {($settingsRankingStore.negativeWeight * 0.01).toFixed(2)}</td
          >
        </tr>
      {/if}
    </tbody>
  </table>

  <div class="flex justify-center">
    <button
      type="button"
      class="button small ghost"
      onclick={downloadApplicationState}
    >
      Download Application State
    </button>
  </div>
</section>

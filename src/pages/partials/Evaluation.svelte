<script module>
  import { downloadJSON } from "@common/jsonUtil";

  import {
    settingsRankingStore,
    settingsSimulationStore,
    settingsAgentStore,
  } from "@stores/settings";
  import { feedStore } from "@stores/feed";
  import { instructionsStore } from "@/stores/instructions";
  import { personaAgentsStore } from "@stores/personas";
  import { userMetricsStore } from "@stores/evaluation";
  import { threadMetricsDefault } from "@presets/evaluation";

  import Chart from "@components/atoms/Chart.svelte";
</script>

<script lang="ts">
  import type { Thread } from "@stores/feed";
  import type { ChartConfiguration } from "chart.js/auto";

  function getTopThreadsChartConfig(
    feed: readonly Thread[],
  ): ChartConfiguration {
    const config = structuredClone(threadMetricsDefault);
    config.data.datasets = [];

    const topThreads = [...feed]
      .sort((a, b) => b.metrics.score - a.metrics.score)
      .slice(0, 5);

    let maxLen = 0;
    topThreads.forEach((t) => {
      const len = 1 + (t.replies?.length || 0);
      if (len > maxLen) maxLen = len;
    });

    config.data.labels = Array.from({ length: maxLen }, (_, i) => i.toString());

    const COLORS = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];

    topThreads.forEach((thread, i) => {
      const components = [thread.post, ...(thread.replies || [])];
      config.data.datasets.push({
        label: `Thread ${feed.indexOf(thread) + 1}`,
        data: components.map((_, index) => {
          const slice = components.slice(0, index + 1);
          return (
            slice.reduce((sum, c) => sum + c.metrics.score, 0) / slice.length
          );
        }),
        fill: false,
        borderColor: COLORS[i % COLORS.length],
        tension: 0.1,
      });
    });

    return config as ChartConfiguration;
  }

  function downloadApplicationState() {
    downloadJSON({
      settings: {
        simulation: $settingsSimulationStore,
        agent: $settingsAgentStore,
        ranking: $settingsRankingStore,
      },
      feed: $feedStore,
      instructions: $instructionsStore,
      personas: $personaAgentsStore,
    });
  }
</script>

<h3 class="sectionheading">Network Evaluation</h3>
<p class="sectionnote mb-1">
  This graph tracks the sentiment score of the top 5 threads over their
  components. Watch how these change as the conversation evolves and how
  different ranker shift the balance.
</p>
<div class="rounded-xl bg-gray-50 p-3 px-3">
  <Chart config={getTopThreadsChartConfig($feedStore)} height={250} />
</div>

<hr class="divider" />

<h3 class="sectionheading">User Evaluation</h3>
<p class="sectionnote mb-1">
  This chart compares the average emotional tone of each virtual participant.
  See which personas tend to be more positive or negative in their posts, and
  observe how the ranker amplifies certain voices while diminishing others.
</p>
<div class="rounded-xl bg-gray-50 p-3 px-3">
  <Chart config={$userMetricsStore} height={300} />
</div>

<hr class="divider" />

<h3 class="text-sm font-medium text-gray-900">Settings</h3>

<table class="mb-8 w-full table-auto text-xs text-slate-600">
  <tbody>
    <tr>
      <td>Ranking Type</td>
      <td class="font-mono"
        >{$settingsRankingStore.sentimentBased
          ? "Sentiment = po+ne"
          : "Chronological = new > old"}</td
      >
    </tr>
    {#if $settingsRankingStore.sentimentBased}
      <tr>
        <td>
          Positivity Weight
          <span class="circle green ml-1"></span>
        </td>
        <td class="font-mono"
          >po * {($settingsRankingStore.positiveWeight * 0.01).toFixed(2)}</td
        >
      </tr>
      <tr>
        <td>
          Negativity Weight
          <span class="circle red ml-1"></span>
        </td>
        <td class="font-mono"
          >ne * {($settingsRankingStore.negativeWeight * 0.01).toFixed(2)}</td
        >
      </tr>
    {/if}
  </tbody>
</table>

<div class="flex justify-center">
  <button class="button small outline" onclick={() => downloadApplicationState}>
    Download Application State
  </button>
</div>

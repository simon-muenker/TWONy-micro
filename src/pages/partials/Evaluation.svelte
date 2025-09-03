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
  import { networkMetricsStore, userMetricsStore } from "@stores/evaluation";

  import Chart from "@components/atoms/Chart.svelte";
</script>

<script lang="ts">
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
  This graph tracks the overall emotional tone of your social network over time.
  Watch how these change as the conversation evolves and how different ranker
  shift the balance.
</p>
<div class="rounded-xl bg-gray-50 p-3 px-3">
  <Chart config={$networkMetricsStore} height={250} />
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

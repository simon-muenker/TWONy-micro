<script module>
  import { downloadJSON } from "@/common";

  import {
    settingsRankingStore,
    settingsSimulationStore,
    settingsAgentStore,
  } from "@stores/settings";
  import { feedStore } from "@stores/feed";
  import { personaAgentsStore } from "@stores/personas";
  import { networkMetricsStore, userMetricsStore } from "@stores/metrics";

  import Button from "@components/common/Button.svelte";
  import Chart from "@components/common/Chart.svelte";
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
      personas: $personaAgentsStore,
    });
  }
</script>

<h2 class="mb-4 text-2xl">Network Metrics</h2>
<Chart config={$networkMetricsStore} height={250} />

<div class="my-12 block"></div>

<h2 class="mb-4 text-2xl">User Metrics</h2>
<Chart config={$userMetricsStore} height={300} />

<div class="my-12 block border-b"></div>

<h2 class="mb-2 text-2xl">Settings</h2>

<table class="w-full table-auto text-sm text-slate-400">
  <tbody>
    <tr>
      <td>Emotion-based ranking</td>
      <td>{$settingsRankingStore.emotionBased ? "yes" : "no"}</td>
    </tr>
    {#if $settingsRankingStore.emotionBased}
      <tr>
        <td>Negative valence weight</td>
        <td>{($settingsRankingStore.negativeWeight * 0.01).toFixed(2)}</td>
      </tr>
      <tr>
        <td>Positive valence weight</td>
        <td>{($settingsRankingStore.positiveWeight * 0.01).toFixed(2)}</td>
      </tr>
    {/if}
  </tbody>
</table>

<div class="my-12 block border-b"></div>

<div class="flex justify-center">
  <button on:click={() => downloadApplicationState()}>
    <Button
      classes="text-xs !bg-transparent border-2 !border-slate-500 !text-slate-500"
    >
      Download Application State
    </Button>
  </button>
</div>

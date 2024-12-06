<script lang="ts">
  import { networkMetricsStore, userMetricsStore } from "@stores/metrics";
  import { rankingSettingsStore } from "@stores/config";
  import Chart from "@components/common/Chart.svelte";
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
      <td>{$rankingSettingsStore.emotionBased ? "yes" : "no"}</td>
    </tr>
    {#if $rankingSettingsStore.emotionBased}
      <tr>
        <td>Negative valence weight</td>
        <td>{($rankingSettingsStore.negativeWeight * 0.01).toFixed(2)}</td>
      </tr>
      <tr>
        <td>Positive valence weight</td>
        <td>{($rankingSettingsStore.positiveWeight * 0.01).toFixed(2)}</td>
      </tr>
    {/if}
  </tbody>
</table>

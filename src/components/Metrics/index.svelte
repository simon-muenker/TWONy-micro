<script module>
  import { downloadJSON } from "@common";

  import {
    settingsRankingStore,
    settingsSimulationStore,
    settingsAgentStore,
  } from "@stores/settings";
  import { feedStore } from "@stores/feed";
  import { instructionsStore } from "@/stores/instructions";
  import { personaAgentsStore } from "@stores/personas";
  import { networkMetricsStore, userMetricsStore } from "@stores/metrics";

  import Divider from "@components/common/Divider.svelte";
  import Button from "@components/common/Button.svelte";
  import Chart from "@components/common/Chart.svelte";

  import Circle from "@components/common/typography/Circle.svelte";
  import HeadingSection from "@components/common/typography/HeadingSection.svelte";
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

<HeadingSection>Network Metrics</HeadingSection>
<Chart config={$networkMetricsStore} height={250} />

<Divider />

<HeadingSection>User Metrics</HeadingSection>
<Chart config={$userMetricsStore} height={300} />

<Divider />

<HeadingSection>Settings</HeadingSection>

<table class="mb-8 w-full table-auto text-xs text-slate-600">
  <tbody>
    <tr>
      <td>Emotion-based ranking</td>
      <td>{$settingsRankingStore.emotionBased ? "yes" : "no"}</td>
    </tr>
    {#if $settingsRankingStore.emotionBased}
      <tr>
        <td>
          <Circle color="emerald" />
          Positive valence weight
        </td>
        <td>{($settingsRankingStore.positiveWeight * 0.01).toFixed(2)}</td>
      </tr>
      <tr>
        <td>
          <Circle color="rose" />
          Negative valence weight
        </td>
        <td>{($settingsRankingStore.negativeWeight * 0.01).toFixed(2)}</td>
      </tr>
    {/if}
  </tbody>
</table>

<div class="flex justify-center">
  <Button
    color="gray"
    size="small"
    outline
    clickEvent={downloadApplicationState}
  >
    Download Application State
  </Button>
</div>

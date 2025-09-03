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

  import Divider from "@components/common/Divider.svelte";
  import Button from "@components/common/Button.svelte";
  import Chart from "@components/common/Chart.svelte";

  import Circle from "@components/common/typography/Circle.svelte";
  import HeadingSection from "@components/common/typography/HeadingSection.svelte";
  import ParagraphSection from "@components/common/typography/ParagraphSection.svelte";
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

<HeadingSection>Network Evaluation</HeadingSection>
<ParagraphSection>
  TODO: shortly explain the network level evaluation
</ParagraphSection>
<Chart config={$networkMetricsStore} height={250} />

<Divider />

<HeadingSection>User Evaluation</HeadingSection>
<ParagraphSection>
  TODO: shortly explain the user level evaluation
</ParagraphSection>
<Chart config={$userMetricsStore} height={300} />

<Divider />

<HeadingSection>Settings</HeadingSection>

<table class="mb-8 w-full table-auto text-xs text-slate-600">
  <tbody>
    <tr>
      <td>Ranking Type</td>
      <td
        >{$settingsRankingStore.sentimentBased
          ? "Sentiment-based"
          : "Chronological"}</td
      >
    </tr>
    {#if $settingsRankingStore.sentimentBased}
      <tr>
        <td>
          Positivity Weight
          <Circle color="emerald" />
        </td>
        <td>{($settingsRankingStore.positiveWeight * 0.01).toFixed(2)}</td>
      </tr>
      <tr>
        <td>
          Negativity Weight
           <Circle color="rose" />
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

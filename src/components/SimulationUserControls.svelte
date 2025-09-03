<script module>
  import { MODELS } from "@/_constants";

  import {
    settingsSimulationStore,
    settingsAgentStore,
  } from "@/stores/settings";
  import { clearFeed } from "@stores/feed";
  import { resetEvaluation } from "@stores/evaluation";
</script>

<script lang="ts">
  let running: boolean = $state(settingsSimulationStore.get().running);
  let tickTime: number = $state(settingsSimulationStore.get().tickTime);
  let model: (typeof MODELS)[number] = $state(settingsAgentStore.get().model);

  $effect(() => {
    settingsSimulationStore.setKey("running", running);
    settingsSimulationStore.setKey("tickTime", tickTime);
    settingsAgentStore.setKey("model", model);
  });

  function resetSimulation() {
    running = false;
    clearFeed();
    resetEvaluation();
  }
</script>

<div class="flex justify-between gap-6">
  <div>
    <div class="caption">Simulation Control</div>
    <button
      class="button small {running ? 'red' : 'green'}"
      onclick={() => (running = !running)}
    >
      {running ? "Stop" : "Start"}
    </button>
    <button class="button small red outline" onclick={() => resetSimulation()}>
      Reset
    </button>
  </div>
  <div class="grow"></div>
  <div>
    <div class="caption">Language Model</div>
    <select name="model" id="model" bind:value={model} class="inputbase">
      {#each MODELS as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
  </div>
  <div>
    <div class="caption">Speed (ms)</div>
    <input
      type="number"
      class="inputbase"
      bind:value={tickTime}
      min="100"
      max="4000"
    />
  </div>
</div>

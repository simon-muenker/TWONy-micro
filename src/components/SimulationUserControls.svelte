<script module>
  import Icon from "@iconify/svelte";

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

<div class="flex justify-between gap-6 items-center">
  <div class="">
    <button
      class="button base {running ? 'red animate-pulse' : 'green'} mr-1"
      onclick={() => (running = !running)}
    >
      <Icon
        icon={running ? "mdi:stop" : "mdi:play"}
        class="mr-1 -ml-1 h-5 w-5"
      />
      {running ? "Stop" : "Start"}
    </button>
    <button class="button base red outline" onclick={() => resetSimulation()}>
      <Icon icon="mdi:circle-arrows" class="mr-1 -ml-1 h-5 w-5 hover:animate-spin" />
      Reset
    </button>
  </div>
  <div class="grow"></div>
  <div>
    <div class="caption">
      <Icon icon="mdi:robot-outline" class="inline-block h-4 w-4" /> 
      Language Model (Hugging Face)
    </div>
    <select name="model" id="model" bind:value={model} class="inputbase">
      {#each MODELS as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
  </div>
  <div>
    <div class="caption">
      <Icon icon="mdi:speedometer" class="inline-block h-4 w-4" />
      Speed (ms)
    </div>
    <input
      type="number"
      class="inputbase"
      bind:value={tickTime}
      min="100"
      max="4000"
    />
  </div>
</div>

<script module>
  import Icon from "@components/atoms/Icon.svelte";

  import { MODELS } from "@/_constants";

  import {
    settingsSimulationStore,
    settingsAgentStore,
  } from "@stores/settings";
  import { clearFeed } from "@stores/feed";
  import { setNotice } from "@stores/simulation";
  import { resetAssignedModels } from "@logic/agent";
</script>

<script lang="ts">
  // The stores are the single source of truth: the simulation itself may
  // stop a run (e.g. on an invalid API key), which must be reflected here.
  let running = $derived($settingsSimulationStore.running);

  function toggleRunning(): void {
    settingsSimulationStore.setKey("running", !running);
  }

  function resetSimulation(): void {
    settingsSimulationStore.setKey("running", false);
    clearFeed();
    resetAssignedModels();
    setNotice(null);
  }

  function updateTickTime(event: Event): void {
    const value = (event.currentTarget as HTMLInputElement).valueAsNumber;
    if (Number.isFinite(value)) {
      settingsSimulationStore.setKey("tickTime", value);
    }
  }

  function updateModel(event: Event): void {
    settingsAgentStore.setKey(
      "model",
      (event.currentTarget as HTMLSelectElement).value,
    );
  }
</script>

<div
  class="flex flex-col-reverse gap-4 p-1 sm:flex-row sm:items-end sm:justify-between"
>
  <div class="flex shrink-0 items-center gap-2">
    <button
      type="button"
      class="button base {running
        ? 'red'
        : 'green'} w-full justify-center sm:w-auto"
      onclick={toggleRunning}
    >
      <Icon
        icon={running ? "mdi:stop" : "mdi:play"}
        class="mr-1 -ml-1 h-5 w-5"
      />
      {running ? "Stop" : "Start"}
    </button>
    <button
      type="button"
      class="button base ghost red w-full justify-center sm:w-auto"
      onclick={resetSimulation}
    >
      <Icon icon="mdi:circle-arrows" class="mr-1 -ml-1 h-5 w-5" />
      Reset
    </button>
  </div>

  <div class="flex min-w-0 gap-4 sm:justify-end">
    <label class="block min-w-0 grow sm:max-w-72">
      <span class="caption">
        <Icon icon="mdi:robot-outline" class="inline-block h-4 w-4" />
        Language Model (Hugging Face)
      </span>
      <select
        name="model"
        class="inputbase"
        value={$settingsAgentStore.model}
        onchange={updateModel}
      >
        {#each MODELS as option (option)}
          <option value={option}>{option}</option>
        {/each}
      </select>
    </label>
    <label class="hidden w-24 shrink-0 sm:block">
      <span class="caption">
        <Icon icon="mdi:speedometer" class="inline-block h-4 w-4" />
        Speed (ms)
      </span>
      <input
        type="number"
        class="inputbase"
        min="100"
        max="10000"
        step="100"
        value={$settingsSimulationStore.tickTime}
        onchange={updateTickTime}
      />
    </label>
  </div>
</div>

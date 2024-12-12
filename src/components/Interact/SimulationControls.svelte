<script module>
  import { MODELS } from "@/constants";

  import {
    settingsSimulationStore,
    settingsAgentStore,
  } from "@/stores/settings";
  import { clearFeed } from "@stores/feed";
  import { resetMetrics } from "@stores/metrics";

  import Button from "@components/common/Button.svelte";
  import Divider from "@components/common/Divider.svelte";
  import Spinner from "@components/common/Spinner.svelte";
  import InputSelect from "@components/common/InputSelect.svelte";
  import InputNumeric from "@components/common/InputNumeric.svelte";

  import Caption from "@components/common/typography/Caption.svelte";
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
    resetMetrics();
  }
</script>

<div class="flex justify-between gap-6">
  <div>
    <Caption>Simulation Control</Caption>
    <Button
      color={running ? "red" : "green"}
      size="small"
      clickEvent={() => (running = !running)}
    >
      {running ? "Stop" : "Start"}
    </Button>
    <Button
      color="gray"
      size="small"
      outline
      clickEvent={() => resetSimulation()}
    >
      Reset
    </Button>
  </div>
  <div class="flex items-center justify-center">
    <Spinner {running} />
  </div>
  <div class="grow"></div>
  <div>
    <Caption>Language Model</Caption>
    <InputSelect label="model" options={[...MODELS]} bind:value={model} />
  </div>
  <div>
    <Caption>Speed (ms)</Caption>
    <InputNumeric min="100" max="4000" bind:value={tickTime} />
  </div>
</div>

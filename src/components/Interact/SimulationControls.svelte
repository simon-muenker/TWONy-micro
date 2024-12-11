<script module>
  import { MODELS } from "@/constants";

  import { settingsSimulationStore, settingsAgentStore } from "@/stores/settings";
  import { clearFeed } from "@stores/feed";
  import { resetMetrics } from "@stores/metrics";

  import Button from "@components/common/Button.svelte";
  import Select from "@components/common/Select.svelte";
  import InputNumeric from "@components/common/InputNumeric.svelte";
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
</script>

<div class="my-4 block border-b"></div>
<div class="flex justify-between gap-6">
  <div>
    <span class="mb-1 block text-xs text-slate-500">Simulation Control</span>
    <button onclick={() => (running = !running)}>
      <Button classes="text-xs {running ? 'bg-red-500' : 'bg-green-500'}">
        {running ? "Stop" : "Start"}
      </Button>
    </button>
    <button
      onclick={() => {
        running = false;
        clearFeed();
        resetMetrics();
      }}
    >
      <Button
        classes="text-xs !bg-transparent border-2 !border-slate-500 !text-slate-500"
        >Reset
      </Button>
    </button>
  </div>
  <div class="flex items-center justify-center">
    <svg
      class="{running
        ? 'animate-spin opacity-100'
        : 'opacity-0'} transition-all"
      width="40"
      height="40"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#3b82f6"
    >
      <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
          <stop stop-color="#3b82f6" stop-opacity="0" offset="0%" />
          <stop stop-color="#3b82f6" stop-opacity=".631" offset="63.146%" />
          <stop stop-color="#3b82f6" offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            id="Oval-2"
            stroke="url(#a)"
            stroke-width="2"
          >
          </path>
          <circle fill="#3b82f6" cx="36" cy="18" r="1"></circle>
        </g>
      </g>
    </svg>
  </div>
  <div class="grow"></div>
  <div>
    <span class="mb-1 block text-xs text-slate-500">Language Model</span>
    <Select label="model" options={[...MODELS]} bind:value={model} />
  </div>
  <div>
    <span class="mb-1 block text-xs text-slate-500">Speed (ms)</span>
    <InputNumeric min="100" max="4000" bind:value={tickTime} />
  </div>
</div>

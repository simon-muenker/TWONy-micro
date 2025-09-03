<script module>
  import Icon from "@iconify/svelte";

  import { settingsSimulationStore } from "@stores/settings";
</script>

<script lang="ts">
  let apiKey: string | undefined = $state(settingsSimulationStore.get().apiKey);

  $effect(() => {
    settingsSimulationStore.setKey("apiKey", apiKey);
  });
</script>

<div class="box blue">
  <label for="api_token">
    <div class="caption">
      <Icon icon="mdi:key" class="mr-0.5 inline-block h-4 w-4" />
      Hugging Face API Key
      <a
        href="https://huggingface.co/docs/inference-providers/en/index"
        target="_blank"
      >
        <span class="text-blue-800 opacity-80">(More Information)</span>
      </a>
    </div>
  </label>
  <input
    id="api_token"
    type="text"
    bind:value={apiKey}
    class="inputbase base"
  />
</div>

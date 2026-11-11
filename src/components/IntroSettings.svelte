<script module>
  import Icon from "@components/atoms/Icon.svelte";

  import { settingsSimulationStore } from "@stores/settings";
</script>

<script lang="ts">
  let apiKey: string = $state(settingsSimulationStore.get().apiKey ?? "");

  function updateApiKey(): void {
    // keys are often pasted with surrounding whitespace
    settingsSimulationStore.setKey("apiKey", apiKey.trim());
  }
</script>

<div class="box green my-3">
  <div class="caption">
    <label for="api_token">
      <Icon icon="mdi:key" class="mr-0.5 inline-block h-4 w-4" />
      Hugging Face API Key
    </label>
    <a
      href="https://huggingface.co/docs/inference-providers/en/index"
      target="_blank"
      rel="noopener noreferrer"
      class="text-blue-800 opacity-80 hover:underline"
    >
      (More Information)
    </a>
  </div>
  <input
    id="api_token"
    type="password"
    autocomplete="off"
    spellcheck="false"
    placeholder="hf_..."
    bind:value={apiKey}
    oninput={updateApiKey}
    class="inputbase base"
  />
</div>

<script module>
  import Icon from "@iconify/svelte";

  import { settingsSimulationStore } from "@stores/settings";

  import Button from "@components/common/Button.svelte";
  import Caption from "@components/common/typography/Caption.svelte";
</script>

<script lang="ts">
  let apiKey: string | undefined = $state(settingsSimulationStore.get().apiKey);

  $effect(() => {
    settingsSimulationStore.setKey("apiKey", apiKey);
  });
</script>

<div class="rounded-xl bg-sky-50 px-3 py-3">
  <label for="api_token">
    <Caption>
      <Icon icon="mdi:key" class="mr-0.5 inline-block h-4 w-4" />
      Hugging Face API Key
      <a
        href="https://huggingface.co/docs/inference-providers/en/index"
        target="_blank"
      >
        <span class="text-blue-800 opacity-80">(More Information)</span>
      </a>
    </Caption>
  </label>
  <input
    id="api_token"
    type="text"
    bind:value={apiKey}
    class="mb-4 block w-full w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
  />

  <Button>Continue to News Feed</Button>
</div>

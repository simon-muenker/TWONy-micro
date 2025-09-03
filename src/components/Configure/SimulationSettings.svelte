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

<label for="api_token">
  <Caption>
    <Icon icon="mdi:key" class="mr-0.5 inline-block h-4 w-4" />
    Hugging Face API Key
  </Caption>
</label>
<input
  id="api_token"
  type="text"
  bind:value={apiKey}
  class="mb-4 w-full text-sm"
/>

<Button>Continue to News Feed</Button>

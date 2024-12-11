<script module>
  import { settingsRankingStore } from "@/stores/settings";

  import Checkbox from "@components/common/Checkbox.svelte";
</script>

<script lang="ts">
  let emotionBased: boolean = $state(settingsRankingStore.get().emotionBased);

  $effect(() => {
    settingsRankingStore.setKey("emotionBased", emotionBased);
  });
</script>

<label class="inline-flex cursor-pointer items-center">
  <span class="mr-3 text-sm font-medium text-gray-900">Chronological</span>
  <Checkbox bind:value={emotionBased} />
  <span class="ms-3 text-sm font-medium text-gray-900"
    >Emotion-based (intense emotion rank higher)</span
  >
</label>

<script module>
  import Checkbox from "@components/common/Checkbox.svelte";

  import {
    rankingSettingsStore,
    setRankingSettingsEmotionBased,
  } from "@stores/config";
</script>

<script lang="ts">
  let emotionBased: boolean = $state(rankingSettingsStore.get().emotionBased);

  $effect(() => {
    setRankingSettingsEmotionBased(emotionBased);
  });
</script>

<label class="inline-flex cursor-pointer items-center">
  <span class="mr-3 text-sm font-medium text-gray-900">Chronological</span>
  <Checkbox bind:value={emotionBased} />
  <span class="ms-3 text-sm font-medium text-gray-900"
    >Emotion-based (intense emotion rank higher)</span
  >
</label>

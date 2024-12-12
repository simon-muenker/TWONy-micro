<script module>
  import { settingsRankingStore } from "@/stores/settings";

  import InputCheckbox from "@components/common/InputCheckbox.svelte";
  import HeadingSection from "@components/common/typography/HeadingSection.svelte";
</script>

<script lang="ts">
  let emotionBased: boolean = $state(settingsRankingStore.get().emotionBased);

  $effect(() => {
    settingsRankingStore.setKey("emotionBased", emotionBased);
  });
</script>

<HeadingSection>Ranker Type</HeadingSection>

<label class="inline-flex cursor-pointer items-center">
  <span class="mr-3 text-sm font-medium text-gray-900">Chronological</span>
  <InputCheckbox bind:value={emotionBased} />
  <span class="ms-3 text-sm font-medium text-gray-900">
    Emotion-based (intense emotion rank higher)
  </span>
</label>

<script module>
  import { settingsRankingStore } from "@/stores/settings";

  import InputCheckbox from "@components/common/InputCheckbox.svelte";
  import HeadingSection from "@components/common/typography/HeadingSection.svelte";
</script>

<script lang="ts">
  let sentimentBased: boolean = $state(
    settingsRankingStore.get().sentimentBased,
  );

  $effect(() => {
    settingsRankingStore.setKey("sentimentBased", sentimentBased);
  });
</script>

<HeadingSection>Ranker Type</HeadingSection>

<label class="inline-flex cursor-pointer items-center">
  <span class="mr-3 text-sm font-medium text-gray-900">Chronological</span>
  <InputCheckbox bind:value={sentimentBased} />
  <span class="ms-3 text-sm font-medium text-gray-900">
    Sentiment-based (intense sentiments rank higher)
  </span>
</label>

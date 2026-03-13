<script module>
  import { settingsRankingStore } from "@/stores/settings";

  import InputPill from "@components/atoms/InputPill.svelte";
</script>

<script lang="ts">
  let sentimentBased: boolean = $state(
    settingsRankingStore.get().sentimentBased,
  );

  $effect(() => {
    settingsRankingStore.setKey("sentimentBased", sentimentBased);
  });
</script>

<div class="box blue">
  <label class="inline-flex cursor-pointer items-center">
    <span class="mr-3 text-sm font-medium text-gray-900">Chronological</span>
    <InputPill bind:value={sentimentBased} />
    <span class="ms-3 text-sm font-medium text-gray-900">
      Sentiment-based <span class="hidden sm:inline">(weights are multiplied with the sentiments)</span>
    </span>
  </label>
</div>

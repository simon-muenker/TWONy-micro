<script module>
  import { settingsRankingStore } from "@stores/settings";

  import InputPill from "@components/atoms/InputPill.svelte";
</script>

<div class="box blue">
  <label class="inline-flex cursor-pointer items-center">
    <span class="mr-3 text-sm font-medium text-gray-900">Chronological</span>
    <InputPill
      value={$settingsRankingStore.sentimentBased}
      onchange={(value) => settingsRankingStore.setKey("sentimentBased", value)}
    />
    <span class="ms-3 text-sm font-medium text-gray-900">
      Sentiment-based
      <span class="hidden font-normal sm:inline">
        (weights are multiplied with the sentiments)
      </span>
    </span>
  </label>
</div>

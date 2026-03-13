<script module>
  import { settingsRankingStore } from "@/stores/settings";
</script>

<div
  class={`transition-opacity ${
    $settingsRankingStore.sentimentBased
      ? "opacity-100"
      : "opacity-40 select-none cursor-not-allowed"
  }`}
>
  <h3 class="sectionheading">Sentiment Weighting</h3>
  <p class="sectionsubline">
    <strong
      >Fine-tune how much positive and negative emotions influence post
      visibility when using sentiment-based ranking.</strong
    > Moving the sliders changes whether cheerful, supportive posts or critical,
    angry posts get more prominence in the feed. Set both high to amplify all emotional
    content, or adjust them differently to see how favoring one type of emotion changes
    the conversation's overall tone. This mirrors how real platforms might optimize
    for different types of engagement.
  </p>
</div>
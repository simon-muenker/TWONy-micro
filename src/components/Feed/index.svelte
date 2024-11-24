<script module>
  import _ from "lodash";
  import { fade } from "svelte/transition";

  import { feedStore } from "@stores/feed";

  import Button from "@components/common/Button.svelte";

  import FeedItem from "./FeedItem.svelte";
</script>

<script lang="ts">
  // TODO ALPHA code, needs urgent optimization
  function getFeedNegativeValence(index: number): number {
    let score: number = 0;

    function getItemScore(item: Object) {
      let score: number = 0;

      Object.entries(item).forEach((obj) => {
        if (["anger", "fear", "pessimism"].includes(obj[0])) {
          score += obj[1];
        }
      });

      return score / 3;
    }

    score += getItemScore(feedStore.get()[index].post.metrics);

    if (feedStore.get()[index].replies) {
      feedStore.get()[index].replies.forEach((element) => {
        score += getItemScore(element.metrics);
      });

      score /= feedStore.get()[index].replies.length + 1;
    }

    return score;
  }

  // TODO ALPHA code, needs urgent optimization
  function getFeedPositiveValence(index: number): number {
    let score: number = 0;

    function getItemScore(item: Object) {
      let score: number = 0;

      Object.entries(item).forEach((obj) => {
        if (["joy", "trust", "optimism"].includes(obj[0])) {
          score += obj[1];
        }
      });

      return score / 3;
    }

    score += getItemScore(feedStore.get()[index].post.metrics);

    if (feedStore.get()[index].replies) {
      feedStore.get()[index].replies.forEach((element) => {
        score += getItemScore(element.metrics);
      });

      score /= feedStore.get()[index].replies.length + 1;
    }

    return score;
  }
</script>

<div class="grid grid-cols-1 divide-y">
  {#each $feedStore as thread, index (index)}
    <article class="py-8" animate:fade>
      <FeedItem {...thread.post} />
      {#if thread.replies}
        <section class="pl-12 pt-4 [&>*]:py-2">
          {#each thread.replies as reply}
            <FeedItem {...reply} />
          {/each}
        </section>
      {/if}
      <div
        class="mt-4 flex select-none place-content-end items-center gap-4 text-xs text-slate-500"
      >
        <span
          >negative valence: {_.round(getFeedNegativeValence(index), 2)}</span
        >
        <span
          >positive valence: {_.round(getFeedPositiveValence(index), 2)}</span
        >
        <span
          >thread ranking: {_.round(
            getFeedNegativeValence(index) + getFeedPositiveValence(index),
            2,
          )}</span
        >
        <Button classes="text-xs">Reply</Button>
      </div>
    </article>
  {/each}
</div>

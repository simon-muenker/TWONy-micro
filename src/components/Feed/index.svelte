<script module>
  import _ from "lodash";

  import { cubicOut } from "svelte/easing";

  import { settingsRankingStore } from "@/stores/settings";
  import { reverseFeedStore, rankedFeedStore } from "@stores/feed";

  import Circle from "@components/common/typography/Circle.svelte";

  import ThreadItem from "./ThreadItem.svelte";
</script>

<div class="grid grid-cols-1 divide-y">
  {#each $settingsRankingStore.emotionBased ? $rankedFeedStore : $reverseFeedStore as thread, index (index)}
    <article class="py-8">
      <ThreadItem {...thread.post} />
      {#if thread.replies}
        <section class="ml-4 border-l-4 pl-4 pt-4 [&>*]:py-2">
          {#each thread.replies as reply}
            <ThreadItem {...reply} />
          {/each}
        </section>
      {/if}
      <div
        class="mt-4 flex place-content-end items-center gap-4 text-xs text-slate-500"
      >
        <span>
          <Circle color="emerald" />
          positive valence: {_.round(thread.metrics.posValence, 2)}
        </span>
        <span class="">
          <Circle color="rose" />
          negative valence: {_.round(thread.metrics.negValence, 2)}
        </span>
        <span class="font-bold">
          thread ranking: {_.round(thread.metrics.score, 2)}
        </span>
      </div>
    </article>
  {/each}
</div>

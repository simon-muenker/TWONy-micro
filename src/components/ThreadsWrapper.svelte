<script module>
  import _ from "lodash";

  import { settingsSimulationStore, settingsRankingStore } from "@/stores/settings";
  import { reverseFeedStore, rankedFeedStore } from "@stores/feed";

  import Circle from "@components/common/typography/Circle.svelte";

  import ThreadItem from "./ThreadItem.svelte";
</script>

{#if $settingsSimulationStore.running}
  <span class="text-center mx-auto block my-4 italic text-sm animate-pulse">
    Generating Content ... Please stand by.
  </span>
{/if}

<div class="grid grid-cols-1 gap-4">
  {#each $settingsRankingStore.sentimentBased ? $rankedFeedStore : $reverseFeedStore as thread, index (index)}
    <article class="rounded-xl bg-sky-50 p-3 px-3">
      <ThreadItem {...thread.post} />
      {#if thread.replies}
        <section class="ml-4 border-l-4 border-gray-200 pt-4 pl-4 [&>*]:py-2">
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
          positivity: {_.round(thread.metrics.classes.positive, 2)}
        </span>
        <span class="">
          <Circle color="rose" />
          negativity: {_.round(thread.metrics.classes.negative, 2)}
        </span>
        <span class="font-bold">
          thread ranking: {_.round(thread.metrics.score, 2)}
        </span>
      </div>
    </article>
  {/each}
</div>

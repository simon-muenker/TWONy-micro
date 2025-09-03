<script module>
  import _ from "lodash";

  import {
    settingsSimulationStore,
    settingsRankingStore,
  } from "@/stores/settings";
  import {
    feedStore,
    reverseFeedStore,
    rankedFeedStore,
    threadItemStore,
  } from "@stores/feed";

  import ThreadItem from "@/components/SimulationThreadItem.svelte";
</script>

<span class="mt-4 mb-4 block text-xs">
  Currently {$feedStore.length} Threads and {$threadItemStore.length} Items totally
  in generated Feed. Content may be inaccurate or false.
</span>

{#if $settingsSimulationStore.running}
  <span class="mx-auto my-4 block animate-pulse text-center text-sm italic">
    Generating Content ... Please stand by.
  </span>
{/if}

<div class="grid grid-cols-1 gap-4">
  {#each $settingsRankingStore.sentimentBased ? $rankedFeedStore : $reverseFeedStore as thread, index (index)}
    <article class="box">
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
          positivity <span class="circle green"></span>: {_.round(
            thread.metrics.classes.positive,
            2,
          )}
        </span>
        <span class="">
          negativity <span class="circle red"></span>: {_.round(
            thread.metrics.classes.negative,
            2,
          )}
        </span>
        <span class="font-bold">
          thread score: {_.round(thread.metrics.score, 2)}
        </span>
      </div>
    </article>
  {/each}
</div>

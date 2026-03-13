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
    isClassifyingStore,
  } from "@stores/feed";
  import { personaUserStore } from "@stores/personas";

  import ThreadItem from "@/components/SimulationThreadItem.svelte";
</script>

<span class="mt-4 mb-4 block text-xs">
  Currently {$feedStore.length} Threads and {$threadItemStore.length} Items totally
  in generated Feed. Content may be inaccurate or false.
</span>

{#if $settingsSimulationStore.running || $isClassifyingStore}
  <span class="mx-auto my-4 block animate-pulse text-center text-sm italic">
    Generating & Classifying Content ...<br class="sm:hidden">Please stand by.
  </span>
{/if}

<div class="grid grid-cols-1 gap-16 mt-8">
  {#each $settingsRankingStore.sentimentBased ? $rankedFeedStore : $reverseFeedStore as thread, index (index)}
    <article class="relative">
      {#if thread.post.name === $personaUserStore[0].name}
        <div
          class="absolute top-4 right-4 text-sm text-gray-400"
          title="Pinned Post"
        >
          📌 Pinned
        </div>
      {/if}
      <section class="box green">
        <ThreadItem {...thread.post} />
      </section>
      {#if thread.replies}
          {#each thread.replies as reply}
          <section class="ml-4 sm:ml-16 mt-3 sm:mt-6 box">
            <ThreadItem {...reply} />
          </section>
          {/each}
      {/if}
      <div
        class="mt-4 flex place-content-end items-center gap-4 text-xs text-slate-500"
      >
        <span>
          avg. positivity <span class="circle green"></span>: {_.round(
            thread.metrics.classes.positive,
            2,
          )}
        </span>
        <span class="">
          avg. negativity <span class="circle red"></span>: {_.round(
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

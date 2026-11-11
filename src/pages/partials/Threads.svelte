<script module>
  import { PAGES } from "@/_constants";

  import { round } from "@common/util";

  import { settingsSimulationStore } from "@stores/settings";
  import {
    displayFeedStore,
    threadItemStore,
    isClassifyingStore,
  } from "@stores/feed";
  import { simulationNoticeStore } from "@stores/simulation";

  import Icon from "@components/atoms/Icon.svelte";
  import ThreadItem from "@components/SimulationThreadItem.svelte";

  const INTRO_ROUTE = PAGES[0].route;
</script>

<p class="mt-4 text-xs text-slate-600">
  Currently {$displayFeedStore.length}
  {$displayFeedStore.length === 1 ? "thread" : "threads"} with {$threadItemStore.length}
  {$threadItemStore.length === 1 ? "item" : "items"} in the generated feed. Content
  may be inaccurate or false.
</p>

{#if $simulationNoticeStore}
  {@const notice = $simulationNoticeStore}
  <div
    class="mt-4 flex items-start gap-2 rounded-xl px-3 py-3 text-sm {notice.kind ===
    'error'
      ? 'bg-rose-50 text-rose-900'
      : 'bg-sky-50 text-sky-900'}"
    role={notice.kind === "error" ? "alert" : "status"}
  >
    <Icon
      icon={notice.kind === "error"
        ? "mdi:alert-circle-outline"
        : "mdi:information-outline"}
      class="mt-0.5 h-5 w-5 shrink-0"
    />
    <p class="min-w-0 break-words">
      {notice.message}
      {#if notice.needsApiKey}
        <a href={INTRO_ROUTE} class="font-bold underline">
          Enter your API key on the Introduction page.
        </a>
      {/if}
    </p>
  </div>
{/if}

<!-- fixed height: the status line must not shift the feed when it toggles -->
<p
  class="my-4 flex min-h-10 items-center justify-center text-center text-sm text-slate-600 italic"
  aria-live="polite"
>
  {#if $settingsSimulationStore.running || $isClassifyingStore}
    <span class="animate-pulse">
      Generating & Classifying Content ...<br class="sm:hidden" /> Please stand by.
    </span>
  {:else if $displayFeedStore.length === 0}
    The feed is empty. Press 'Start' or write the first post yourself.
  {/if}
</p>

<div class="grid grid-cols-1 gap-12 sm:gap-16">
  {#each $displayFeedStore as { id, thread, score, pinned } (id)}
    <article>
      <section class="box green relative">
        {#if pinned}
          <div class="absolute top-3 right-3 text-sm text-gray-500">
            📌 Pinned
          </div>
        {/if}
        <ThreadItem {...thread.post} />
      </section>
      {#each thread.replies ?? [] as reply, index (index)}
        <section class="box mt-3 sm:mt-6 sm:ml-16">
          <ThreadItem {...reply} />
        </section>
      {/each}
      <div
        class="mt-4 flex flex-wrap place-content-end items-center gap-x-4 gap-y-1 text-xs text-slate-500 tabular-nums"
      >
        <span>
          avg. positivity <span class="circle green"></span>: {round(
            thread.metrics.classes.positive,
          ).toFixed(2)}
        </span>
        <span>
          avg. negativity <span class="circle red"></span>: {round(
            thread.metrics.classes.negative,
          ).toFixed(2)}
        </span>
        <span class="font-bold">
          score: {round(score).toFixed(2)}
        </span>
      </div>
    </article>
  {/each}
</div>

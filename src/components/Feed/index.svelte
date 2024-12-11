<script module>
  import _ from "lodash";

  import { cubicOut } from "svelte/easing";

  import { settingsRankingStore } from "@/stores/settings";
  import { reverseFeedStore, rankedFeedStore } from "@stores/feed";

  import ThreadItem from "./ThreadItem.svelte";
</script>

<script lang="ts">
  function slide(
    node: HTMLElement,
    { from, to }: { from: DOMRect; to: DOMRect },
  ) {
    const dx: number = from.left - to.left;
    const dy: number = from.top - to.top;

    const d: number = Math.sqrt(dx * dx + dy * dy);

    return {
      delay: 0,
      duration: Math.sqrt(d) * 120,
      easing: cubicOut,
      css: (u: number) => `transform: translate(${u * dx}px, ${u * dy}px);`,
    };
  }
</script>

<div class="grid grid-cols-1 divide-y">
  {#each $settingsRankingStore.emotionBased ? $rankedFeedStore : $reverseFeedStore as thread, index (index)}
    <article class="py-8" animate:slide>
      <ThreadItem {...thread.post} />
      {#if thread.replies}
        <section class="pl-12 pt-4 [&>*]:py-2">
          {#each thread.replies as reply}
            <ThreadItem {...reply} />
          {/each}
        </section>
      {/if}
      <div
        class="mt-4 flex select-none place-content-end items-center gap-4 text-xs text-slate-500"
      >
        <span>negative valence: {_.round(thread.metrics.negValence, 2)}</span>
        <span>positive valence: {_.round(thread.metrics.posValence, 2)}</span>
        <span>thread ranking: {_.round(thread.metrics.score, 2)}</span>
      </div>
    </article>
  {/each}
</div>

<script module>
  import _ from "lodash";

  import { cubicOut } from "svelte/easing";

  import { reverseFeedStore, rankedFeedStore } from "@stores/feed";
  import { rankingSettingsStore } from "@stores/config";

  import Button from "@components/common/Button.svelte";

  import ThreadItem from "./ThreadItem.svelte";
</script>

<script lang="ts">
  function slide(
    node: HTMLElement,
    { from, to }: { from: DOMRect; to: DOMRect },
    params: any,
  ) {
    const dx = from.left - to.left;
    const dy = from.top - to.top;

    const d = Math.sqrt(dx * dx + dy * dy);

    return {
      delay: 0,
      duration: Math.sqrt(d) * 120,
      easing: cubicOut,
      css: (t, u) => `transform: translate(${u * dx}px, ${u * dy}px);`,
    };
  }
</script>

<div class="grid grid-cols-1 divide-y">
  {#each $rankingSettingsStore.emotionBased ? $rankedFeedStore : $reverseFeedStore as thread, index (index)}
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

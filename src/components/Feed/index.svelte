<script module>
  import _ from "lodash";

  import { flip } from "svelte/animate";

  import { reverseFeedStore, rankedFeedStore } from "@stores/feed";
  import { rankingSettingsStore } from "@stores/config";

  import Button from "@components/common/Button.svelte";

  import ThreadItem from "./ThreadItem.svelte";
</script>

<div class="grid grid-cols-1 divide-y">
  {#each $rankingSettingsStore.emotionBased ? $rankedFeedStore : $reverseFeedStore as thread, index (index)}
    <article class="py-8" animate:flip>
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

        <!-- <Button classes="text-xs">Reply</Button> -->
      </div>
    </article>
  {/each}
</div>

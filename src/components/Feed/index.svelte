<script module>
  import _ from "lodash";

  import { feedStore } from "@stores/feed";
  import { getThreadMetrics } from "@stores/metrics";

  import Button from "@components/common/Button.svelte";

  import ThreadItem from "./ThreadItem.svelte";
</script>

<div class="grid grid-cols-1 divide-y">
  {#each $feedStore as thread, index (index)}
    <article class="py-8">
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
        <span
          >negative valence: {_.round(
            getThreadMetrics(thread).negativeValence,
            2,
          )}</span
        >
        <span
          >positive valence: {_.round(
            getThreadMetrics(thread).positiveValence,
            2,
          )}</span
        >
        <span>thread ranking: {_.round(getThreadMetrics(thread).score, 2)}</span>
        <Button classes="text-xs">Reply</Button>
      </div>
    </article>
  {/each}
</div>

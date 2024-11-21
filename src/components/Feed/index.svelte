<script module>
  import _ from "lodash";
  import { fade } from "svelte/transition";

  import { feedStore } from "@stores/feed";

  import Button from "@components/common/Button.svelte";

  import FeedItem from "./FeedItem.svelte";
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
        <span>negative valence: {_.round(_.random(true), 1)}</span>
        <span>positive valence: {_.round(_.random(true), 1)}</span>
        <span>thread ranking: {_.round(_.random(true), 1)}</span>
        <Button classes="text-xs">Reply</Button>
      </div>
    </article>
  {/each}
</div>

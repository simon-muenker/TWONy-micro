<script lang="ts">
  import { feedStore } from "@stores/feed";

  import Button from "@components/common/Button.svelte";

  import FeedItem from "./FeedItem.svelte";
</script>

<div class="grid grid-cols-1 divide-y">
  {#each $feedStore as thread}
    <article class="py-8">
      <section>
        <FeedItem {...thread.post} />
      </section>
      {#if thread.replies}
        <section class="pl-12">
          <span class="mb-2 block text-sm font-bold">Replies</span>
          {#each thread.replies as reply}
            <FeedItem {...reply} />
          {/each}
        </section>
      {/if}
      <div
        class="mt-4 flex select-none place-content-end items-center gap-4 text-sm text-slate-500"
      >
        {#if thread.replies}
          <span>avg. positivity: 0.2</span>
          <span>avg. negativity: 0.2</span>
          <span>thread ranking: 0.2</span>
        {/if}
        <Button classes="text-xs">Reply</Button>
      </div>
    </article>
  {/each}
</div>

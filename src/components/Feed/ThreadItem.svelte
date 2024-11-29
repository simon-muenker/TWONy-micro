<script module>
  import _ from "lodash";
  import { fade } from "svelte/transition";

  import { EMOTIONS, type ThreadItem } from "@stores/feed";
</script>

<script lang="ts">
  let { icon, name, message, metrics }: ThreadItem = $props();

  const emotions: Array<string> = EMOTIONS.positive.concat(EMOTIONS.negative);
</script>

<div class="flex gap-4" transition:fade>
  <div class="p-1 text-center text-3xl">
    {icon}
  </div>
  <div class="grow">
    <span class="mr-0.5 font-extrabold text-black">{name}</span>
    <span class="text-sm text-slate-500">@{name}</span>
    <br />
    <span>{message}</span>
    <div
      class="mt-2 flex select-none divide-x-2 text-xs text-slate-500 [&>*]:px-2"
    >
      {#each Object.entries(metrics) as [label, value]}
        {#if emotions.includes(label)}
          <span>{label}: {_.round(value, 2)}</span>
        {/if}
      {/each}
    </div>
  </div>
</div>

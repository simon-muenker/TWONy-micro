<script module>
  import _ from "lodash";
  import { fade } from "svelte/transition";

  import { type ThreadItem } from "@stores/feed";

  import Circle from "@components/common/typography/Circle.svelte";
</script>

<script lang="ts">
  let { icon, name, message, metrics }: ThreadItem = $props();
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
    <div class="mt-2 flex gap-2 text-xs text-slate-500 select-none">
      <div>
        <Circle color="emerald" />
        <span class=""
          >positivivity: {_.round(metrics.classes.positive, 2)}</span
        >
        <span class="px-0.5 last:hidden">·</span>
      </div>
      <div>
        <Circle color="rose" />
        <span class="">negativity: {_.round(metrics.classes.negative, 2)}</span>
        <span class="px-0.5 last:hidden">·</span>
      </div>
    </div>
  </div>
</div>

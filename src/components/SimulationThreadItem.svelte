<script module>
  import { fade } from "svelte/transition";

  import { round } from "@common/util";

  import { type ThreadItem } from "@stores/feed";
</script>

<script lang="ts">
  let { icon, name, message, metrics, model }: ThreadItem = $props();
</script>

<div class="flex gap-4" in:fade={{ duration: 200 }}>
  <div class="hidden p-1 text-center text-3xl sm:block" aria-hidden="true">
    {icon}
  </div>
  <div class="min-w-0 grow">
    <div class="flex items-center gap-2">
      <div class="mr-1 text-center text-2xl sm:hidden" aria-hidden="true">
        {icon}
      </div>
      <div
        class="flex min-w-0 flex-col gap-x-1.5 sm:flex-row sm:items-baseline"
      >
        <span class="font-extrabold break-all text-black">@{name}</span>
        {#if model}
          <span class="text-xs break-all text-slate-500">({model})</span>
        {/if}
      </div>
    </div>
    <p class="text-sm break-words sm:text-base">{message}</p>
    <div
      class="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 tabular-nums select-none"
    >
      <span>
        positivity <span class="circle green"></span>: {round(
          metrics.classes.positive,
        ).toFixed(2)}
      </span>
      <span>
        negativity <span class="circle red"></span>: {round(
          metrics.classes.negative,
        ).toFixed(2)}
      </span>
    </div>
  </div>
</div>

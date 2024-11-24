<script module>
  import _ from "lodash";
</script>

<script lang="ts">
  let {
    icon,
    name,
    message,
    metrics,
  }: {
    icon: string;
    name: string;
    message: string;
    metrics: {
      anger: number;
      fear: number;
      pessimism: number;
      joy: number;
      trust: number;
      optimism: number;
    };
  } = $props();

  const emotions: Array<string> = [
    "anger",
    "fear",
    "pessimism",
    "joy",
    "trust",
    "optimism",
  ];
</script>

<div class="flex gap-4">
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

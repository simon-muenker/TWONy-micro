<script lang="ts">
  let {
    label,
    value = $bindable(100),
    min = "-100",
    max = "100",
    step = "20",
    description = {
      min: "decreased",
      center: "ranking effect",
      max: "increased",
    },
  }: {
    label: string;
    value: number;
    min?: string | number;
    max?: string | number;
    step?: string | number;
    description?: {
      min: string;
      center: string;
      max: string;
    };
  } = $props();
</script>

<div class="relative text-sm text-slate-900">
  <label for={label} class="sr-only">{label}</label>
  <input
    id={label}
    type="range"
    bind:value
    {min}
    {max}
    {step}
    class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200"
  />
  <span class="absolute start-0 -bottom-6">
    <span class="">{min}</span>
    <span class="text-xs text-slate-600">({description.min})</span>
  </span>
  <span class="absolute start-1/2 -bottom-6 -translate-x-1/2">
    <span class="font-bold">{value}</span>
    <span class="text-xs text-slate-600">({description.center})</span>
  </span>
  <span class="absolute end-0 -bottom-6">
    <span class="">{max}</span>
    <span class="text-xs text-slate-600">({description.max})</span>
  </span>
</div>

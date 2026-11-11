<script lang="ts">
  let {
    label,
    value,
    onchange,
    disabled = false,
    min = "-100",
    max = "100",
    step = "20",
    description = {
      min: "decreased",
      center: "rank effect",
      max: "increased",
    },
  }: {
    label: string;
    value: number;
    onchange: (value: number) => void;
    disabled?: boolean;
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
    {min}
    {max}
    {step}
    {value}
    oninput={(event) => onchange(event.currentTarget.valueAsNumber)}
    {disabled}
    class={`h-2 w-full appearance-none rounded-lg bg-slate-200 ${
      disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
    }`}
  />
  <span class="absolute start-0 -bottom-6">
    <span class="text-sm text-slate-400 italic">{min}</span>
    <span class="hidden text-xs text-slate-600 sm:inline"
      >({description.min})</span
    >
  </span>
  <span class="absolute start-1/2 -bottom-6 -translate-x-1/2">
    <span class="font-bold">{value}</span>
    <span class="text-xs text-slate-600">({description.center})</span>
  </span>
  <span class="absolute end-0 -bottom-6">
    <span class="text-sm text-slate-400 italic">{max}</span>
    <span class="hidden text-xs text-slate-600 sm:inline"
      >({description.max})</span
    >
  </span>
</div>

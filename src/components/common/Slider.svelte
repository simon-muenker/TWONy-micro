<script lang="ts">
  let {
    label,
    value = $bindable(100),
    min = "-100",
    max = "100",
    step = "20",
  }: {
    label: string;
    value: number;
    min: string | number;
    max: string | number;
    step: string | number;
  } = $props();
</script>

<div class="relative text-sm text-gray-500">
  <label for={label} class="sr-only">{label}</label>
  <input
    id={label}
    type="range"
    bind:value
    {min}
    {max}
    {step}
    class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
  />
  <span class="absolute -bottom-6 start-0">decreased</span>
  <span class="absolute -bottom-6 start-1/2 -translate-x-1/2"
    >ranking effect</span
  >
  <span class="absolute -bottom-6 end-0">increased</span>
</div>

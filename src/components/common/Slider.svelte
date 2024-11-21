<script lang="ts">
  let { label }: { label: String } = $props();
</script>

<div class="relative text-sm text-gray-500">
  <label for={label} class="sr-only">{label}</label>
  <input
    id={label}
    type="range"
    value="80"
    min="-100"
    max="100"
    step="20"
    class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
  />
  <span class="absolute -bottom-6 start-0">negative</span>
  <span class="absolute -bottom-6 start-1/2 -translate-x-1/2">neutral</span>
  <span class="absolute -bottom-6 end-0">positive</span>
</div>

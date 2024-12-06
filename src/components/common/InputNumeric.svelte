<script lang="ts">
  let {
    value = $bindable(100),
    min = "0",
    max = "100",
  }: {
    value: number;
    min?: string | number;
    max?: string | number;
  } = $props();
</script>

<input
  type="number"
  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
  bind:value
  {min}
  {max}
/>

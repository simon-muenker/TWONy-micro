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
  class="block w-full rounded-lg border border-gray-500 bg-white p-2 text-xs text-gray-900 focus:border-sky-500 focus:ring-sky-500"
  bind:value
  {min}
  {max}
/>

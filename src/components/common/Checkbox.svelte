<script lang="ts">
  let { value = $bindable(false) }: { value: boolean } = $props();
</script>

<input type="checkbox" class="peer sr-only" bind:checked={value} />
<div
  class="
    peer relative h-6 w-11 rounded-full bg-gray-200
    after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']
    peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300
  "
></div>

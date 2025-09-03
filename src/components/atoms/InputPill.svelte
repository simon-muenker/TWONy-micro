<script lang="ts">
  let { value = $bindable(false) }: { value: boolean } = $props();
</script>

<input type="checkbox" class="peer sr-only" bind:checked={value} />
<div
  class="
    peer relative h-6 w-11 rounded-full bg-slate-200
    peer-checked:bg-sky-600 peer-focus:ring-4 peer-focus:ring-blue-300 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300
    after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white
  "
></div>

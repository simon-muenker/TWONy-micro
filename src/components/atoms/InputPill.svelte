<script lang="ts">
  let {
    value,
    onchange,
  }: {
    value: boolean;
    onchange: (value: boolean) => void;
  } = $props();
</script>

<input
  type="checkbox"
  role="switch"
  class="peer sr-only"
  checked={value}
  onchange={(event) => onchange(event.currentTarget.checked)}
/>
<div
  class="
    peer relative h-6 w-11 shrink-0 rounded-full bg-slate-200
    peer-checked:bg-sky-600 peer-focus-visible:ring-4 peer-focus-visible:ring-blue-300 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300
    after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white
  "
></div>

<script lang="ts">
  let {
    label,
    value = $bindable(""),
    options = [],
  }: {
    label: string;
    value: string;
    options: Array<string>;
  } = $props();
</script>

<select
  name={label}
  id={label}
  bind:value
  class="block w-full rounded-lg border border-gray-500 bg-white p-2 text-xs text-gray-900 focus:border-sky-500 focus:ring-sky-500"
>
  {#each options as option}
    <option value={option}>{option}</option>
  {/each}
</select>

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
  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
>
  {#each options as option}
    <option value={option}>{option}</option>
  {/each}
</select>

<script module>
  import { instructionsStore } from "@stores/instructions";
</script>

{#each Object.entries($instructionsStore) as [key, instruction], index (index)}
  <h3 class="text-bold mb-1 text-xl">{key}</h3>
  <textarea
    name={key}
    id={key}
    class="w-full grow resize-none rounded-lg border-0 bg-slate-100 bg-transparent p-2 text-sm text-slate-700 focus:outline-0"
    value={instruction.content}
    on:change={(newValue) =>
      instructionsStore.setKey(key, {
        ...instruction,
        content: newValue.target.value,
      })}
  ></textarea>
{/each}

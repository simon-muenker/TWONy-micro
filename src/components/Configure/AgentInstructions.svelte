<script module>
  import { instructionsStore } from "@stores/instructions";
</script>

{#each Object.entries($instructionsStore) as [key, instruction], index (index)}
  <h3 class="text-bold mb-1 text-xl">task: {key}</h3>
  <p class="mb-2 text-sm text-gray-900" contenteditable>
    {instruction.content}
  </p>
{/each}

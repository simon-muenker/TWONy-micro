<script module>
  import { instructionsStore, resetInstructions } from "@stores/instructions";

  import Button from "@components/common/Button.svelte";
</script>

<div class="mb-2 flex justify-between gap-4">
  <h2 class="text-2xl">Prompt Introduction</h2>
  <button on:click={() => resetInstructions()}>
    <Button classes="text-xs !bg-red-500">Reset Instructions</Button>
  </button>
</div>

{#each Object.entries($instructionsStore) as [key, instruction], index (index)}
  <h3 class="text-bold mb-1 text-xl">{key}</h3>
  <textarea
    name={key}
    id={key}
    class="w-full grow resize-none rounded-lg border-0 bg-gray-50 p-2 text-sm text-slate-700 focus:outline-0"
    value={instruction.content}
    on:change={(newValue) =>
      instructionsStore.setKey(key, {
        ...instruction,
        content: newValue.target.value,
      })}
  ></textarea>
{/each}

<script module>
  import { instructionsStore, resetInstructions } from "@stores/instructions";

  import Button from "@components/common/Button.svelte";
  import HeadingSection from "@components/common/typography/HeadingSection.svelte";
</script>

<div class="mb-2 flex justify-between gap-4">
  <HeadingSection spacing={false}>Prompt Introduction</HeadingSection>

  <Button color="red" size="small" clickEvent={resetInstructions}>
    Reset Instructions
  </Button>
</div>

{#each Object.entries($instructionsStore) as [key, instruction], index (index)}
  <h3 class="text-bold mb-1 text-xl">{key}</h3>
  <textarea
    name={key}
    id={key}
    class="w-full grow resize-none rounded-lg border-0 bg-gray-50 p-2 text-sm text-slate-700 focus:outline-0"
    value={instruction.content}
    onchange={(newValue) =>
      instructionsStore.setKey(key, {
        ...instruction,
        content: newValue.target.value,
      })}
  ></textarea>
{/each}

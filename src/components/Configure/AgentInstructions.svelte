<script module>
  import Icon from "@iconify/svelte";

  import { instructionsStore, resetInstructions } from "@stores/instructions";

  import Button from "@components/common/Button.svelte";
  import HeadingSection from "@components/common/typography/HeadingSection.svelte";
</script>

<script lang="ts">
  const actions: Array<Object> = [
    {
      label: "upload",
      icon: "mdi:file-upload-outline",
      color: "gray",
      clickEvent: () => console.log("upload"),
    },
    {
      label: "download",
      icon: "mdi:file-download-outline",
      color: "gray",
      clickEvent: () => console.log("download"),
    },
    {
      label: "reset",
      icon: "mdi:circle-arrows",
      color: "red",
      clickEvent: () => resetInstructions(),
    },
  ];
</script>

<HeadingSection>Customize Instructions</HeadingSection>

<div class="mb-4 flex gap-4">
  {#each actions as action}
    <Button color={action.color} size="small" clickEvent={action.clickEvent}>
      <Icon icon={action.icon} class="mr-1 inline-block h-5 w-5" />
      {action.label}
    </Button>
  {/each}
</div>

{#each Object.entries($instructionsStore) as [key, instruction], index (index)}
  <h3 class="text-bold mb-1 text-xl">{key}</h3>
  <textarea
    name={key}
    id={key}
    class="w-full grow resize-none rounded-lg border-0 bg-gray-50 p-2 text-sm text-slate-700 focus:outline-0"
    rows="8"
    value={instruction.content}
    onchange={(newValue) =>
      instructionsStore.setKey(key, {
        ...instruction,
        content: newValue.target.value,
      })}
  ></textarea>
{/each}

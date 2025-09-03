<script module>
  import Icon from "@iconify/svelte";

  import { downloadJSON, uploadJSON } from "@common/jsonUtil";

  import type { ChatItem } from "@api/chat";

  import {
    type Instructions,
    instructionsStore,
    resetInstructions,
  } from "@stores/instructions";

  import Button from "@components/common/Button.svelte";
  import HeadingSection from "@components/common/typography/HeadingSection.svelte";
</script>

<script lang="ts">
  const actions: Array<{
    label: string;
    icon: string;
    color: "gray" | "blue" | "red";
    clickEvent: Function;
  }> = [
    {
      label: "download",
      icon: "mdi:file-download-outline",
      color: "gray",
      clickEvent: () => downloadJSON(instructionsStore.get(), "instructions"),
    },
    {
      label: "reset",
      icon: "mdi:circle-arrows",
      color: "red",
      clickEvent: () => resetInstructions(),
    },
  ];

  function updateInstruction(
    key: keyof Instructions,
    instruction: ChatItem,
    event: Event,
  ): void {
    if (!event.target) {
      throw new Error("No event target.");
    } else {
      const target = event.target as HTMLTextAreaElement;
      instructionsStore.setKey(key, {
        ...instruction,
        content: target.value,
      });
    }
  }
</script>

<HeadingSection>Customize Instructions</HeadingSection>

<div class="mb-4 flex gap-4">
  <Button color="gray" size="small" clickEvent={() => {}}>
    <label for="instruction-upload" class="flex cursor-pointer items-center">
      <Icon icon="mdi:file-upload-outline" class="mr-1 inline-block h-5 w-5" />
      upload
      <input
        type="file"
        id="instruction-upload"
        accept=".json"
        hidden
        onchange={async (event) => {
          instructionsStore.set((await uploadJSON(event)) as Instructions);
        }}
      />
    </label>
  </Button>

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
    onchange={(event) =>
      updateInstruction(key as keyof Instructions, instruction, event)}
  ></textarea>
{/each}

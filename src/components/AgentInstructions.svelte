<script module>
  import Icon from "@iconify/svelte";

  import { downloadJSON, uploadJSON } from "@common/jsonUtil";

  import type { ChatItem } from "@api/chat";

  import {
    type Instructions,
    instructionsStore,
    resetInstructions,
  } from "@stores/instructions";
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

<div class="flex flex-col gap-4">
  <div class="box">
    <div class="flex gap-4 items-center">
      <span class="grow text-sm font-medium text-gray-900">Batch Controls:</span>
      <button class="button small">
        <label
          for="instruction-upload"
          class="flex cursor-pointer items-center"
        >
          <Icon
            icon="mdi:file-upload-outline"
            class="mr-1 inline-block h-5 w-5"
          />
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
      </button>

      {#each actions as action}
        <button
          class="button small {action.color}"
          onclick={() => action.clickEvent()}
        >
          <Icon icon={action.icon} class="mr-1 inline-block h-5 w-5" />
          {action.label}
        </button>
      {/each}
    </div>
  </div>

  {#each Object.entries($instructionsStore) as [key, instruction], index (index)}
    <div class="box blue">
      <h3 class="text-sm font-medium text-gray-900 mb-1.5">Adapt {key} instruction</h3>
      <textarea
        name={key}
        id={key}
        class="textarea"
        rows="8"
        value={instruction.content}
        onchange={(event) =>
          updateInstruction(key as keyof Instructions, instruction, event)}
      ></textarea>
    </div>
  {/each}
</div>

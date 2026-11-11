<script module>
  import Icon from "@components/atoms/Icon.svelte";

  import { downloadJSON, uploadJSON } from "@common/jsonUtil";

  import type { ChatItem } from "@api/chat";

  import {
    type Instructions,
    instructionsStore,
    isInstructions,
    resetInstructions,
  } from "@stores/instructions";
</script>

<script lang="ts">
  let uploadError: string | null = $state(null);

  async function upload(event: Event): Promise<void> {
    uploadError = null;
    try {
      const data = await uploadJSON(event);
      if (!isInstructions(data)) {
        throw new Error(
          "The file does not contain post and reply instructions.",
        );
      }
      instructionsStore.set({ post: data.post, reply: data.reply });
    } catch (error) {
      uploadError = error instanceof Error ? error.message : String(error);
    }
  }

  function updateInstruction(
    key: keyof Instructions,
    instruction: ChatItem,
    event: Event,
  ): void {
    const target = event.target as HTMLTextAreaElement;
    instructionsStore.setKey(key, {
      ...instruction,
      content: target.value,
    });
  }
</script>

<div class="flex flex-col gap-4">
  <div class="box">
    <div class="flex items-center gap-4">
      <span class="grow text-sm font-medium text-gray-900">batch controls</span>

      <label class="button small hidden sm:inline-flex">
        <Icon
          icon="mdi:file-upload-outline"
          class="mr-1 inline-block h-5 w-5"
        />
        upload
        <input type="file" accept=".json" class="sr-only" onchange={upload} />
      </label>

      <button
        type="button"
        class="button small hidden sm:inline-flex"
        onclick={() => downloadJSON(instructionsStore.get(), "instructions")}
      >
        <Icon
          icon="mdi:file-download-outline"
          class="mr-1 inline-block h-5 w-5"
        />
        download
      </button>

      <button
        type="button"
        class="button small red"
        onclick={() => resetInstructions()}
      >
        <Icon icon="mdi:circle-arrows" class="mr-1 inline-block h-5 w-5" />
        reset
      </button>
    </div>
    {#if uploadError}
      <p class="mt-2 text-xs text-rose-700" role="alert">
        Upload failed: {uploadError}
      </p>
    {/if}
  </div>

  {#each Object.entries($instructionsStore) as [key, instruction] (key)}
    <div class="box blue">
      <label
        for={`instruction-${key}`}
        class="mb-1.5 block text-sm text-slate-600"
      >
        adapt <span class="font-medium text-slate-800">{key}</span> instruction
      </label>
      <textarea
        name={key}
        id={`instruction-${key}`}
        class="textarea -mb-1"
        rows="5"
        value={instruction.content}
        onchange={(event) =>
          updateInstruction(key as keyof Instructions, instruction, event)}
      ></textarea>
    </div>
  {/each}
</div>

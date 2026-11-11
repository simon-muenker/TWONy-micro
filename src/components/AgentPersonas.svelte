<script module>
  import Icon from "@components/atoms/Icon.svelte";

  import { downloadJSON, uploadJSON } from "@common/jsonUtil";

  import {
    personaAgentsStore,
    addPersonaDummy,
    isPersonaList,
    resetPersonas,
    setPersonas,
  } from "@stores/personas";

  import AgentPersonasEntry from "./AgentPersonasEntry.svelte";
</script>

<script lang="ts">
  let uploadError: string | null = $state(null);

  async function upload(event: Event): Promise<void> {
    uploadError = null;
    try {
      const data = await uploadJSON(event);
      if (!isPersonaList(data)) {
        throw new Error(
          "The file does not contain a list of personas (icon, name, instruction).",
        );
      }
      setPersonas(data);
    } catch (error) {
      uploadError = error instanceof Error ? error.message : String(error);
    }
  }

  let personas = $derived(Object.values($personaAgentsStore));
</script>

<div class="flex flex-col gap-4">
  <div class="box">
    <div class="flex items-center gap-2 sm:gap-4">
      <span class="grow text-sm font-medium text-gray-900">
        batch controls
        <span class="font-normal text-slate-500"
          >({personas.length} personas)</span
        >
      </span>

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
        onclick={() => downloadJSON(personas, "personas")}
      >
        <Icon
          icon="mdi:file-download-outline"
          class="mr-1 inline-block h-5 w-5"
        />
        download
      </button>

      <button
        type="button"
        class="button small blue"
        onclick={() => addPersonaDummy()}
      >
        <Icon icon="mdi:person-add" class="mr-1 inline-block h-5 w-5" />
        add new
      </button>

      <button
        type="button"
        class="button small red"
        onclick={() => resetPersonas()}
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

  {#each personas as agent, index (index)}
    <div class="box blue">
      <AgentPersonasEntry key={index} persona={agent} />
    </div>
  {/each}
</div>

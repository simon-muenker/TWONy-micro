<script module>
  import Icon from "@iconify/svelte";

  import { downloadJSON, uploadJSON } from "@common/jsonUtil";

  import {
    type Persona,
    personaAgentsStore,
    addPersonaDummy,
    resetPersonas,
  } from "@stores/personas";

  import AgentPersonasEntry from "./AgentPersonasEntry.svelte";
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
      clickEvent: () => downloadJSON(personaAgentsStore.get(), "personas"),
    },
    {
      label: "add New",
      icon: "mdi:person-add",
      color: "blue",
      clickEvent: () => addPersonaDummy(),
    },
    {
      label: "reset",
      icon: "mdi:circle-arrows",
      color: "red",
      clickEvent: () => resetPersonas(),
    },
  ];
</script>

<div class="flex flex-col gap-4">
  <div class="box">
    <div class="flex items-center gap-4">
      <span class="grow text-sm font-medium text-gray-900">Batch Controls:</span
      >
      <button class="button small">
        <label for="personas-upload" class="flex cursor-pointer items-center">
          <Icon
            icon="mdi:file-upload-outline"
            class="mr-1 inline-block h-5 w-5"
          />
          upload
          <input
            type="file"
            id="personas-upload"
            accept=".json"
            hidden
            onchange={async (event) => {
              personaAgentsStore.set(
                (await uploadJSON(event)) as Array<Persona>,
              );
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

  {#each Object.entries($personaAgentsStore) as [key, agent], index (index)}
    <div class="box blue">
      <AgentPersonasEntry key={parseInt(key)} persona={agent} />
    </div>
  {/each}
</div>

<script module>
  import Icon from "@iconify/svelte";

  import { downloadJSON, uploadJSON } from "@common/jsonUtil";

  import {
    type Persona,
    personaAgentsStore,
    addPersonaDummy,
    resetPersonas,
  } from "@stores/personas";

  import Button from "@components/common/Button.svelte";

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
  <div class="rounded-xl bg-sky-50 px-3 py-3">
    <div class="flex gap-4">
      <Button color="gray" size="small" clickEvent={() => {}}>
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
      </Button>

      {#each actions as action}
        <Button
          color={action.color}
          size="small"
          clickEvent={action.clickEvent}
        >
          <Icon icon={action.icon} class="mr-1 inline-block h-5 w-5" />
          {action.label}
        </Button>
      {/each}
    </div>
  </div>

  {#each Object.entries($personaAgentsStore) as [key, agent], index (index)}
    <div class="rounded-xl bg-sky-50 px-3 py-3">
      <AgentPersonasEntry key={parseInt(key)} persona={agent} />
    </div>
  {/each}
</div>

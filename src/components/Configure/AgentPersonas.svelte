<script module>
  import Icon from "@iconify/svelte";

  import { downloadJSON, uploadJSON } from "@common";

  import {
    personaAgentsStore,
    addPersonaDummy,
    resetPersonas,
  } from "@stores/personas";

  import Button from "@components/common/Button.svelte";
  import HeadingSection from "@components/common/typography/HeadingSection.svelte";

  import AgentPersonasEntry from "./AgentPersonasEntry.svelte";
</script>

<script lang="ts">
  let placeholderBinded = true;

  const actions: Array<Object> = [
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

<HeadingSection>Customize Personas</HeadingSection>

<div class="mb-4 flex gap-4">
  <Button color="gray" size="small" clickEvent={null}>
    <label for="personas-upload" class="flex cursor-pointer items-center">
      <Icon icon="mdi:file-upload-outline" class="mr-1 inline-block h-5 w-5" />
      upload
      <input
        type="file"
        id="personas-upload"
        accept=".json"
        hidden
        onchange={async (event) => {
          personaAgentsStore.set(await uploadJSON(event));
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

<div class="divide-y">
  {#each Object.entries($personaAgentsStore) as [key, agent], index (index)}
    <AgentPersonasEntry {key} persona={agent} isActive={placeholderBinded} />
  {/each}
</div>

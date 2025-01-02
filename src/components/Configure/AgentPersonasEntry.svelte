<script module>
  import { slide } from 'svelte/transition';

  import Icon from "@iconify/svelte";

  import {
    personaAgentsStore,
    removePersona,
    type Persona,
  } from "@stores/personas";

  import Button from "@components/common/Button.svelte";
  import InputCheckbox from "@components/common/InputCheckbox.svelte";
  import Caption from "@components/common/typography/Caption.svelte";
</script>

<script lang="ts">
  let {
    key,
    persona,
    isActive,
  }: {
    key: number;
    persona: Persona;
    isActive?: boolean;
  } = $props();

  let collapsed = $state(true);
</script>

<div class="py-6">

  <div class="flex items-center justify-between gap-4">
    <button onclick={() => (collapsed = !collapsed)}>
      <Icon icon={collapsed ? "mdi:chevron-down" : "mdi:chevron-up"} class="inline-block h-8 w-8" />
    </button>

    <button onclick={() => (collapsed = !collapsed)}>
      <h3 class="text-bold text-xl" >
        <span class="pr-2">{persona.icon}</span>
        {persona.name}
      </h3>
    </button>

    <div class="grow"></div>

    <InputCheckbox bind:value={isActive} />

    <Button color="red" size="small" clickEvent={() => removePersona(persona)}>
      <Icon icon="mdi:delete-outline" class="mr-1 inline-block h-5 w-5" />
      delete
    </Button>
  </div>

  {#if !collapsed}
    <textarea
      transition:slide
      name={key}
      id={key}
      class="mt-4 w-full grow resize-none rounded-lg border-0 bg-gray-50 p-2 text-sm text-slate-700 focus:outline-0"
      value={persona.instruction}
      rows="32"
      onchange={(newValue) =>
        personaAgentsStore.setKey(key, {
          ...persona,
          instruction: newValue.target.value,
        })}
    ></textarea>
  {/if}

</div>

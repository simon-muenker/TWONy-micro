<script module>
  import { slide } from "svelte/transition";

  import Icon from "@iconify/svelte";

  import {
    personaAgentsStore,
    updatePersona,
    updatePersonaByID,
    removePersona,
    type Persona,
  } from "@stores/personas";

  import Button from "@components/common/Button.svelte";
  import InputCheckbox from "@components/common/InputCheckbox.svelte";
</script>

<script lang="ts">
  let {
    key,
    persona,
  }: {
    key: number;
    persona: Persona;
  } = $props();

  let isActive = $state(persona.active);
  let collapsed = $state(true);

  function updateIcon(event: Event): void {
    if (event.target.textContent.length == 0) {
      event.target.textContent = "❓";
    }

    if (event.target.textContent.length > 1) {
      event.target.textContent = event.target.textContent.slice(0, 1);
    }
    updatePersona({
      ...persona,
      icon: event.target.textContent,
    });
  }

  function updateName(id: number, event: Event): void {
    if (event.target.textContent.length == 0) {
      event.target.textContent = "UnamedAgent";
    }

    if (event.target.textContent.length > 24) {
      event.target.textContent = event.target.textContent.slice(0, 14);
    }

    updatePersonaByID(key, {
      ...persona,
      name: event.target.textContent,
    });
  }
</script>

<div class="py-6">
  <div class="flex items-center justify-between gap-4">
    <button onclick={() => (collapsed = !collapsed)}>
      <Icon
        icon={collapsed ? "mdi:chevron-down" : "mdi:chevron-up"}
        class="inline-block h-8 w-8"
      />
    </button>

    <h3 class="text-bold text-xl">
      <span
        class="mr-2 cursor-pointer rounded-full bg-gray-50 p-2"
        contenteditable
        oninput={(event) => updateIcon(event)}
      >
        {persona.icon}
      </span>
      <span
        class="cursor-pointer rounded-lg bg-gray-50 p-2"
        contenteditable
        oninput={(event) => updateName(key, event)}
      >
        {persona.name}
      </span>
    </h3>

    <div class="grow"></div>

    <!-- <InputCheckbox bind:value={isActive} /> -->

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
      onchange={(event) =>
        updatePersona({
          ...persona,
          instruction: event.target.value,
        })}
    ></textarea>
  {/if}
</div>

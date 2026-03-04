<script module>
  import { slide } from "svelte/transition";

  import Icon from "@iconify/svelte";

  import {
    updatePersona,
    updatePersonaByID,
    removePersona,
    type Persona,
  } from "@stores/personas";
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
    if (!event.target) throw new Error("No event target.");
    const target = event.target as HTMLInputElement;
    let newValue: string = target.value;

    if (newValue.length == 0) newValue = "❓";
    if (newValue.length > 2) newValue = newValue.slice(0, 2);

    updatePersona({ ...persona, icon: newValue });
  }

  function updateName(event: Event): void {
    if (!event.target) throw new Error("No event target.");
    const target = event.target as HTMLInputElement;
    let newValue: string = target.value;

    if (newValue.length == 0) newValue = "UnamedAgent";
    if (newValue.length > 24) newValue = newValue.slice(0, 24);

    updatePersonaByID(key, { ...persona, name: newValue });
  }

  function updateSize(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      target.size = target.value.length || 1;
    }
  }

  function initSize(node: HTMLInputElement) {
    node.size = node.value.length || 1;
  }

  function updateInstruction(event: Event): void {
    if (!event.target) {
      throw new Error("No event target.");
    } else {
      const target = event.target as HTMLTextAreaElement;
      updatePersona({
        ...persona,
        instruction: target.value,
      });
    }
  }
</script>

<div class="flex items-center justify-between gap-4">
  <button onclick={() => (collapsed = !collapsed)}>
    <Icon
      icon={collapsed ? "mdi:chevron-down" : "mdi:chevron-up"}
      class="inline-block h-8 w-8 cursor-pointer"
    />
  </button>

  <span class="flex font-medium text-gray-900">
    <input
      type="text"
      class="mr-2 w-12 cursor-pointer rounded-full bg-white px-3 py-2 text-center focus:outline-0"
      value={persona.icon}
      maxlength="2"
      onchange={(event) => updateIcon(event)}
    />
    <input
      use:initSize
      type="text"
      class="cursor-pointer rounded-lg bg-white px-3 py-2 text-center focus:outline-0"
      value={persona.name}
      onchange={(event) => updateName(event)}
      oninput={updateSize}
    />
  </span>

  <div class="grow"></div>

  <button class="button small red" onclick={() => removePersona(persona)}>
    <Icon icon="mdi:delete-outline" class="mr-1 inline-block h-5 w-5" />
    delete
  </button>
</div>

{#if !collapsed}
  <div transition:slide>
    <hr class="divider small" />
    <textarea
      name={key.toString()}
      id={key.toString()}
      class="textarea -mb-1"
      value={persona.instruction}
      rows="24"
      onchange={(event) => updateInstruction(event)}
    ></textarea>
  </div>
{/if}

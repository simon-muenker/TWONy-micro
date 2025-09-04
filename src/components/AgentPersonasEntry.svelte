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
    const target = event.target as unknown as { textContent: string };
    let newValue: string = target.textContent;

    if (newValue.length == 0) newValue = "❓";
    if (newValue.length > 1) newValue = newValue.slice(0, 1);

    updatePersona({ ...persona, icon: newValue });
  }

  function updateName(event: Event): void {
    if (!event.target) throw new Error("No event target.");
    const target = event.target as unknown as { textContent: string };
    let newValue: string = target.textContent;

    if (newValue.length == 0) newValue = "UnamedAgent";
    if (newValue.length > 20) newValue = newValue.slice(0, 20);

    updatePersonaByID(key, { ...persona, name: newValue });
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

  <span class="font-medium text-gray-900">
    <span
      class="mr-2 cursor-pointer rounded-full bg-white px-3 py-2"
      contenteditable
      oninput={(event) => updateIcon(event)}
    >
      {persona.icon}
    </span>
    <span
      class="cursor-pointer rounded-lg bg-white px-3 py-2"
      contenteditable
      oninput={(event) => updateName(event)}
    >
      {persona.name}
    </span>
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

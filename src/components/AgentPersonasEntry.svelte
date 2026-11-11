<script module>
  import { slide } from "svelte/transition";

  import Icon from "@components/atoms/Icon.svelte";

  import {
    updatePersonaByID,
    removePersonaByID,
    type Persona,
  } from "@stores/personas";

  const MAX_NAME_LENGTH = 20;

  /** First user-perceived character, so multi-codepoint emojis stay intact. */
  function firstGrapheme(value: string): string {
    if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
      const segments = new Intl.Segmenter().segment(value);
      return segments[Symbol.iterator]().next().value?.segment ?? "";
    }
    return Array.from(value)[0] ?? "";
  }
</script>

<script lang="ts">
  let {
    key,
    persona,
  }: {
    key: number;
    persona: Persona;
  } = $props();

  let collapsed = $state(true);

  function updateIcon(event: Event): void {
    const target = event.target as HTMLInputElement;
    const icon = firstGrapheme(target.value.trim()) || "❓";

    target.value = icon;
    updatePersonaByID(key, { ...persona, icon });
  }

  function updateName(event: Event): void {
    const target = event.target as HTMLInputElement;
    const name =
      target.value.trim().slice(0, MAX_NAME_LENGTH) || "UnnamedAgent";

    target.value = name;
    updatePersonaByID(key, { ...persona, name });
  }

  function fitSize(node: HTMLInputElement): void {
    node.size = Math.max(node.value.length, 1);
  }

  function updateInstruction(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    updatePersonaByID(key, { ...persona, instruction: target.value });
  }
</script>

<div class="flex items-center justify-between gap-1 sm:gap-4">
  <button
    type="button"
    class="cursor-pointer rounded-lg"
    aria-expanded={!collapsed}
    aria-label={`${collapsed ? "Show" : "Hide"} profile of ${persona.name}`}
    onclick={() => (collapsed = !collapsed)}
  >
    <Icon
      icon={collapsed ? "mdi:chevron-down" : "mdi:chevron-up"}
      class="inline-block h-8 w-8"
    />
  </button>

  <span class="flex min-w-0 font-medium text-gray-900">
    <input
      type="text"
      aria-label="Icon"
      class="mr-2 w-10 shrink-0 cursor-pointer rounded-full bg-white px-1 py-2 text-center text-sm focus:outline-0 sm:w-12 sm:text-base"
      value={persona.icon}
      onfocus={(event) => event.currentTarget.select()}
      onchange={updateIcon}
    />
    <input
      use:fitSize
      type="text"
      aria-label="Name"
      class="max-w-full min-w-0 cursor-pointer rounded-lg bg-white px-2 py-2 text-center text-sm focus:outline-0 sm:text-base"
      value={persona.name}
      maxlength={MAX_NAME_LENGTH}
      oninput={(event) => fitSize(event.currentTarget)}
      onchange={updateName}
    />
  </span>

  <div class="grow"></div>

  <button
    type="button"
    class="button small red"
    aria-label={`Delete ${persona.name}`}
    onclick={() => removePersonaByID(key)}
  >
    <Icon icon="mdi:delete-outline" class="inline-block h-5 w-5 sm:mr-1" />
    <span class="hidden sm:inline">delete</span>
  </button>
</div>

{#if !collapsed}
  <div transition:slide>
    <hr class="divider small" />
    <textarea
      name={`persona-${key}`}
      aria-label={`Profile of ${persona.name}`}
      class="textarea -mb-1"
      value={persona.instruction}
      rows="24"
      onchange={updateInstruction}
    ></textarea>
  </div>
{/if}

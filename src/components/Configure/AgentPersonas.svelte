<script module>
  import {
    personaAgentsStore,
    removePersona,
    resetPersonas,
  } from "@stores/personas";

  import Button from "@components/common/Button.svelte";
</script>

<div class="mb-2 flex justify-between gap-4">
  <h2 class="text-2xl">Personas Description</h2>
  <button on:click={() => resetPersonas()}>
    <Button classes="text-xs !bg-red-500">Reset all Personas</Button>
  </button>
</div>

<div class="divide-y">
  {#each Object.entries($personaAgentsStore) as [key, agent], index (index)}
    <div class="py-8">
      <div class="mb-2 flex justify-between gap-4">
        <h3 class="text-bold mb-1 text-xl">{agent.icon} {agent.name}</h3>
        <button on:click={() => removePersona(agent)}>
          <Button classes="text-xs !bg-red-500">Delete Persona</Button>
        </button>
      </div>
      <textarea
        name={key}
        id={key}
        class="w-full grow resize-none rounded-lg border-0 bg-gray-50 p-2 text-sm text-slate-700 focus:outline-0"
        value={agent.instruction}
        rows="20"
        on:change={(newValue) =>
          personaAgentsStore.setKey(key, {
            ...agent,
            instruction: newValue.target.value,
          })}
      ></textarea>
    </div>
  {/each}
</div>

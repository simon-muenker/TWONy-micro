<script module>
  import {
    personaAgentsStore,
    removePersona,
    resetPersonas,
  } from "@stores/personas";

  import Button from "@components/common/Button.svelte";
  import HeadingSection from "@components/common/typography/HeadingSection.svelte";
</script>

<div class="mb-2 flex justify-between gap-4">
  <HeadingSection spacing={false}>Personas Description</HeadingSection>
  <Button color="red" size="small" clickEvent={resetPersonas}>
    Reset all Personas
  </Button>
</div>

<div class="divide-y">
  {#each Object.entries($personaAgentsStore) as [key, agent], index (index)}
    <div class="py-8">
      <div class="mb-2 flex justify-between gap-4">
        <h3 class="text-bold mb-1 text-xl">{agent.icon} {agent.name}</h3>
        <Button
          color="red"
          size="small"
          clickEvent={() => removePersona(agent)}
        >
          Delete Persona
        </Button>
      </div>
      <textarea
        name={key}
        id={key}
        class="w-full grow resize-none rounded-lg border-0 bg-gray-50 p-2 text-sm text-slate-700 focus:outline-0"
        value={agent.instruction}
        rows="20"
        onchange={(newValue) =>
          personaAgentsStore.setKey(key, {
            ...agent,
            instruction: newValue.target.value,
          })}
      ></textarea>
    </div>
  {/each}
</div>

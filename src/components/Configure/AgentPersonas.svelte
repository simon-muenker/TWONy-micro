<script module>
  import { personaAgentsStore } from "@stores/personas";
</script>

<div class="divide-y">
  {#each Object.entries($personaAgentsStore) as [key, agent], index (index)}
    <div class="py-8">
      <h3 class="text-bold mb-1 text-xl">{agent.icon} {agent.name}</h3>
      <textarea
        name={key}
        id={key}
        class="w-full grow resize-none rounded-lg border-0 bg-slate-100 p-2 text-sm text-slate-700 focus:outline-0"
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

<script module>
  import { personaAgentsStore } from "@stores/personas";
</script>

<div class="divide-y">
  {#each Object.entries($personaAgentsStore) as [_, agent], index (index)}
    <div class="py-8">
      <h3 class="text-bold mb-1 text-xl">{agent.icon} {agent.name}</h3>
      <p class="mb-2 text-sm text-gray-900" contenteditable>
        {agent.instruction}
      </p>
    </div>
  {/each}
</div>

<script module>
  import type { Snippet } from "svelte";
</script>

<script lang="ts">
  let { children }: { children: Snippet } = $props();
</script>

<span class="mb-1 block text-xs text-slate-500">{@render children()}</span>

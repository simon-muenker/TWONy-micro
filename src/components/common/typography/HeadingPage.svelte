<script module>
  import type { Snippet } from "svelte";
</script>

<script lang="ts">
  let { children }: { children: Snippet } = $props();
</script>

<h2 class="mb-8 text-2xl md:text-4xl">{@render children()}</h2>

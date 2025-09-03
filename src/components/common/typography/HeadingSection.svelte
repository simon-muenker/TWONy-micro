<script module>
  import type { Snippet } from "svelte";
</script>

<script lang="ts">
  let {
    children,
    spacing = true,
  }: {
    children: Snippet;
    spacing?: boolean;
  } = $props();
</script>

<h3 class="{spacing && 'mb-2 md:mb-4'} text-xl md:text-2xl">
  {@render children()}
</h3>

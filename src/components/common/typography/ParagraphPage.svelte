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

<p class="{spacing && 'mb-2 md:mb-4'} leading-8 md:text-lg">
  {@render children()}
</p>

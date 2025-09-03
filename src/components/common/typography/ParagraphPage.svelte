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

<p class="{spacing && 'mb-4'} text-lg leading-8">{@render children()}</p>

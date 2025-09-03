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

<p class="{spacing && 'mb-4'} leading-6 text-gray-900">{@render children()}</p>

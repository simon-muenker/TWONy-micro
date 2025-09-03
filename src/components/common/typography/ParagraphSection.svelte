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

<p class="{spacing && 'mb-4'} text-gray-900 leading-6">{@render children()}</p>

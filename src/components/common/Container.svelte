<script module>
  import type { Snippet } from "svelte";
</script>

<script lang="ts">
  let { classes, children }: { classes: String; children: Snippet } = $props();
</script>

<div class="container mx-auto max-w-screen-xl px-6 {classes}">
  {@render children()}
</div>

<script module>
  import type { Snippet } from "svelte";
</script>

<script lang="ts">
  let { classes, children }: { classes?: String; children: Snippet } = $props();
</script>

<div
  class="
    inline-block cursor-pointer
    rounded-full bg-blue-500 px-3 py-1.5
    font-bold text-white
    {classes}
  "
>
  {@render children()}
</div>

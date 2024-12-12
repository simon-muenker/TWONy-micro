<script module>
  import type { Snippet } from "svelte";
</script>

<script lang="ts">
  let {
    children,
    clickEvent = () => {},
    color = "blue",
    size = "base",
    outline = false,
  }: {
    children: Snippet;
    clickEvent?: Function;
    color?: "blue" | "green" | "red" | "gray";
    size?: "small" | "base";
    outline?: boolean;
  } = $props();
</script>

<button
  class="
    inline-block cursor-pointer
    rounded-full border-2
    px-3 py-1.5
    font-bold
    transition-opacity
    hover:opacity-60
    {size == 'base' && 'text-base'}
    {size == 'small' && 'text-xs'}
    {!outline && `bg-${color}-500 border-transparent text-white`}
    {outline && `bg-transparent border-${color}-400 text-${color}-500`}
  "
  onclick={clickEvent}
>
  {@render children()}
</button>

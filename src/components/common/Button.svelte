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
    inline-flex cursor-pointer
    items-center
    rounded-full border-2
    font-bold
    transition-opacity
    hover:opacity-60
    {size == 'base' && 'px-3 py-1.5 text-base'}
    {size == 'small' && 'px-3 py-1 text-xs'}
    {!outline && `bg-${color}-500 border-transparent text-white`}
    {outline && `bg-transparent border-${color}-400 text-${color}-500`}
  "
  onclick={clickEvent}
>
  {@render children()}
</button>

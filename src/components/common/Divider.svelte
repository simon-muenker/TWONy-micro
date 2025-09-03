<script lang="ts">
  let {
    size = "base",
  }: {
    size?: "small" | "base" | "large";
  } = $props();
</script>

<div
  class="
    block
    border-b
    border-transparent
    {size == 'small' && 'my-3'}
    {size == 'base' && 'my-6'}
    {size == 'large' && 'my-12'}
  "
></div>

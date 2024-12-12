<script lang="ts">
  let {
    size = "base",
  }: {
    size?: "small" | "base";
  } = $props();
</script>

<div
  class="
    block
    border-b
    {size == 'small' && 'my-4'}
    {size == 'base' && 'my-12'}
  "
></div>

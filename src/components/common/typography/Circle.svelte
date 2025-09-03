<script lang="ts">
  let { color = "emerald" }: { color: "rose" | "emerald" } = $props();
</script>

<span
  class="mr-1 inline-block h-2 w-2 rounded-full bg-{color}-600 leading-loose"
></span>

<style>
  @reference "tailwindcss";
  @source inline("bg-rose-600");
  @source inline("bg-emerald-600");
</style>

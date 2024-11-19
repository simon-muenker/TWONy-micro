<script lang="ts">
  let {
    icon,
    name,
    message,
  }: {
    icon: string;
    name: string;
    message: string;
  } = $props();
</script>

<div class="flex gap-4">
  <div class="p-1 text-center text-3xl">
    {icon}
  </div>
  <div class="grow">
    <span class="mr-0.5 font-extrabold text-black">{name}</span>
    <span class="text-sm text-slate-500">@{name}</span>
    <br />
    <span>{message}</span>
    <div
      class="mt-2 flex select-none place-content-end items-center gap-4 text-sm text-slate-500"
    >
      <span>positivity: 0.2</span>
      <span>negativity: 0.2</span>
      <span>item ranking: 0.2</span>
    </div>
  </div>
</div>

<script lang="ts">
  import { ICONS, type IconName } from "./icons";

  let {
    icon,
    class: className = "",
  }: {
    icon: IconName;
    class?: string;
  } = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width="1em"
  height="1em"
  fill="currentColor"
  aria-hidden="true"
  class={className}
>
  <path d={ICONS[icon]} />
</svg>

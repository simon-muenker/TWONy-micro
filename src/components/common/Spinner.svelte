<script lang="ts">
  let { running = false }: { running: boolean } = $props();
</script>

<svg
  class="
    {running ? 'animate-spin opacity-100' : 'opacity-0'} 
    transition-all
  "
  width="40"
  height="40"
  viewBox="0 0 38 38"
  xmlns="http://www.w3.org/2000/svg"
  stroke="#3b82f6"
>
  <defs>
    <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
      <stop stop-color="#3b82f6" stop-opacity="0" offset="0%" />
      <stop stop-color="#3b82f6" stop-opacity=".631" offset="63.146%" />
      <stop stop-color="#3b82f6" offset="100%" />
    </linearGradient>
  </defs>
  <g fill="none" fill-rule="evenodd">
    <g transform="translate(1 1)">
      <path
        d="M36 18c0-9.94-8.06-18-18-18"
        id="Oval-2"
        stroke="url(#a)"
        stroke-width="2"
      >
      </path>
      <circle fill="#3b82f6" cx="36" cy="18" r="1"></circle>
    </g>
  </g>
</svg>

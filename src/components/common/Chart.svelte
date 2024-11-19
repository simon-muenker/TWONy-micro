<script module>
  import { onMount } from "svelte";
  import Chart, { type ChartConfiguration } from "chart.js/auto";
</script>

<script lang="ts">
  let {
    config,
    width = 300,
    height = 300,
  }: {
    config: ChartConfiguration;
    width?: number;
    height?: number;
  } = $props();

  let chart: HTMLCanvasElement;
  let chartObj;

  onMount(() => {
    const ctx: CanvasRenderingContext2D | null = chart.getContext("2d");
    if (ctx) {
      let chartObj = new Chart(ctx, config);
    }
  });
</script>

<div>
  <canvas bind:this={chart} {width} {height}></canvas>
</div>

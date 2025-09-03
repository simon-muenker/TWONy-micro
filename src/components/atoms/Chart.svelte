<script module>
  import { onMount } from "svelte";
  import { Chart, type ChartConfiguration } from "chart.js";
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

  let canvasElem: HTMLCanvasElement;
  let chartObj: Chart;

  onMount(() => {
    const ctx: CanvasRenderingContext2D | null = canvasElem.getContext("2d");
    if (ctx) {
      chartObj = new Chart(ctx, config);
    }
  });

  $effect(() => {
    if (chartObj) {
      chartObj.data = config.data;
      chartObj.update();
    }
  });
</script>

<div>
  <canvas bind:this={canvasElem} {width} {height}></canvas>
</div>

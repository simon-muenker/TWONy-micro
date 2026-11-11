<script module lang="ts">
  // Only the chart types and elements in use are registered (instead of
  // "chart.js/auto") so the unused ones can be tree-shaken from the bundle.
  import {
    Chart,
    BarController,
    BarElement,
    CategoryScale,
    Legend,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Tooltip,
    type ChartData,
    type ChartOptions,
    type Plugin,
  } from "chart.js";

  Chart.register(
    BarController,
    BarElement,
    CategoryScale,
    Legend,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Tooltip,
  );

  Chart.defaults.font.family =
    'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif';
  Chart.defaults.font.size = 11;
  Chart.defaults.color = "#64748b"; // slate-500
  Chart.defaults.borderColor = "#e2e8f0"; // slate-200

  /** Vertical hairline at the hovered position of line charts. */
  const crosshair: Plugin = {
    id: "crosshair",
    afterDatasetsDraw(chart) {
      if ((chart.config as { type?: string }).type !== "line") return;

      const active = chart.tooltip?.getActiveElements() ?? [];
      if (active.length === 0) return;

      const x = active[0].element.x;
      const { top, bottom } = chart.chartArea;
      const { ctx } = chart;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, top);
      ctx.lineTo(x, bottom);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#94a3b8"; // slate-400
      ctx.stroke();
      ctx.restore();
    },
  };
</script>

<script lang="ts">
  let {
    type,
    data,
    options,
    height = 300,
    label,
  }: {
    type: "line" | "bar";
    data: ChartData;
    options: ChartOptions;
    /** Height in px; the width follows the container. */
    height?: number;
    /** Text alternative describing the chart. */
    label: string;
  } = $props();

  let canvasElem: HTMLCanvasElement;
  let chart: Chart | undefined;

  $effect(() => {
    // read both so the effect re-runs whenever either changes
    const nextData = data;
    const nextOptions = options;

    if (!chart) {
      chart = new Chart(canvasElem, {
        type,
        data: nextData,
        options: nextOptions,
        plugins: [crosshair],
      });
      return;
    }

    chart.data = nextData;
    chart.options = nextOptions;
    chart.update();
  });

  $effect(() => {
    return () => {
      chart?.destroy();
      chart = undefined;
    };
  });
</script>

<div class="relative w-full" style:height={`${height}px`}>
  <canvas bind:this={canvasElem} role="img" aria-label={label}></canvas>
</div>

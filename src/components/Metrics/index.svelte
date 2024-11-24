<script lang="ts">
  import { networkMetricsStore, userMetricsStore } from "@stores/metrics";
  import Chart from "@components/common/Chart.svelte";
</script>

<h2 class="mb-4 text-2xl">Network Metrics</h2>
<Chart config={$networkMetricsStore} />

<div class="h-12"></div>

<h2 class="mb-4 text-2xl">User Metrics</h2>
<Chart config={$userMetricsStore} />

<h3 class="mt-8 text-sm">Note</h3>
<span class="block text-xs text-slate-500">
  Both figures currently show dummy values. <br />
  The calculate values below each post display the real prediction, including the
  valence and ranking. However, currently the system does not rerank the values but
  displays them in chronologically.
</span>

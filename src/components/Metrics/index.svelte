<script lang="ts">
  import { networkMetricsStore, userMetricsStore } from "@stores/metrics";
  import Chart from "@components/common/Chart.svelte";
</script>

<h2 class="mb-4 text-2xl">Network Metrics</h2>
<Chart config={$networkMetricsStore} />

<div class="h-12"></div>

<h2 class="mb-4 text-2xl">User Metrics</h2>
<Chart config={$userMetricsStore} height={500} />

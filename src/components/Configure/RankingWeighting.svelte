<script module>
  import Slider from "@components/common/Slider.svelte";

  import { rankingSettingsStore } from "@stores/config";
</script>

<script lang="ts">
  let negativeWeight: number = $state(
    rankingSettingsStore.get().negativeWeight,
  );
  let positiveWeight: number = $state(
    rankingSettingsStore.get().positiveWeight,
  );

  $effect(() => {
    rankingSettingsStore.setKey("negativeWeight", negativeWeight);
    rankingSettingsStore.setKey("positiveWeight", positiveWeight);
  });
</script>

<table class="w-full table-auto">
  <tbody>
    <tr>
      <td class="w-24 py-6">{"negative valence"}</td>
      <td class="py-6">
        <Slider label={"negative valence"} bind:value={negativeWeight} />
      </td>
    </tr>
    <tr>
      <td class="w-24 py-6">{"positive valence"}</td>
      <td class="py-6">
        <Slider label={"positive valence"} bind:value={positiveWeight} />
      </td>
    </tr>
  </tbody>
</table>

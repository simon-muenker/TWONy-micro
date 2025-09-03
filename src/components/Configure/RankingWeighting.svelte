<script module>
  import { settingsRankingStore } from "@/stores/settings";

  import InputSlider from "@components/common/InputSlider.svelte";
</script>

<script lang="ts">
  let negativeWeight: number = $state(
    settingsRankingStore.get().negativeWeight,
  );
  let positiveWeight: number = $state(
    settingsRankingStore.get().positiveWeight,
  );

  $effect(() => {
    settingsRankingStore.setKey("negativeWeight", negativeWeight);
    settingsRankingStore.setKey("positiveWeight", positiveWeight);
  });
</script>

<div class="rounded-xl bg-sky-50 px-3 py-3">
  <table class="w-full table-auto">
    <tbody>
      <tr>
        <td class="w-24 py-6">{"negative valence"}</td>
        <td class="py-6">
          <InputSlider label={"negative valence"} bind:value={negativeWeight} />
        </td>
      </tr>
      <tr>
        <td class="w-24 py-6">{"positive valence"}</td>
        <td class="py-6">
          <InputSlider label={"positive valence"} bind:value={positiveWeight} />
        </td>
      </tr>
    </tbody>
  </table>
</div>

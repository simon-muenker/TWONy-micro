<script module>
  import { settingsRankingStore } from "@/stores/settings";

  import InputSlider from "@components/atoms/InputSlider.svelte";
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

<div class="box blue">
  <table class="w-full table-auto">
    <tbody>
      <tr>
        <td class="w-24 py-6"
          ><span class="text-sm font-medium text-gray-900">positivity</span
          ><span class="circle green ml-1.5"></span></td
        >
        <td class="py-6">
          <InputSlider label={"positivity"} bind:value={positiveWeight} />
        </td>
      </tr>
      <tr>
        <td class="w-24 py-6"
          ><span class="text-sm font-medium text-gray-900">negativity</span
          ><span class="circle red ml-1.5"></span></td
        >
        <td class="py-6">
          <InputSlider label={"negativity"} bind:value={negativeWeight} />
        </td>
      </tr>
    </tbody>
  </table>
</div>

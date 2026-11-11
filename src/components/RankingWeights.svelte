<script module>
  import { settingsRankingStore } from "@stores/settings";

  import InputSlider from "@components/atoms/InputSlider.svelte";
</script>

<div
  class={`box blue transition-opacity ${
    $settingsRankingStore.sentimentBased
      ? "opacity-100"
      : "cursor-not-allowed opacity-40 select-none"
  }`}
>
  <table class="-mt-6 w-full table-auto">
    <tbody>
      <tr>
        <td class="w-24 py-6"
          ><span class="text-sm font-medium text-gray-900">positivity</span
          ><span class="circle green ml-1.5"></span></td
        >
        <td class="py-6">
          <InputSlider
            label="positivity"
            value={$settingsRankingStore.positiveWeight}
            onchange={(value) =>
              settingsRankingStore.setKey("positiveWeight", value)}
            disabled={!$settingsRankingStore.sentimentBased}
          />
        </td>
      </tr>
      <tr>
        <td class="w-24 py-6"
          ><span class="text-sm font-medium text-gray-900">negativity</span
          ><span class="circle red ml-1.5"></span></td
        >
        <td class="py-6">
          <InputSlider
            label="negativity"
            value={$settingsRankingStore.negativeWeight}
            onchange={(value) =>
              settingsRankingStore.setKey("negativeWeight", value)}
            disabled={!$settingsRankingStore.sentimentBased}
          />
        </td>
      </tr>
    </tbody>
  </table>
</div>

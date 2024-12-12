<script module>
  import { post } from "@stores/feed";
  import { personaUserStore } from "@stores/personas";

  import Button from "@components/common/Button.svelte";
  import Caption from "@components/common/typography/Caption.svelte";
</script>

<script lang="ts">
  let message: string = $state("");

  function sendPost() {
    if (message == "") {
      return;
    }
    post(message);
    message = "";
  }
</script>

<div class="flex flex-col gap-4">
  <div class="flex gap-4">
    <span class="inline-block w-8 text-3xl">{$personaUserStore[0].icon}</span>
    <textarea
      name=""
      id=""
      class="grow resize-none border-0 bg-transparent p-1 text-lg text-slate-700 focus:outline-0"
      placeholder="What is happening?!"
      bind:value={message}
    ></textarea>
  </div>
  <div class="flex place-content-between items-center gap-2">
    <Caption>Generated content may be inaccurate or false.</Caption>
    <Button clickEvent={sendPost}>Post</Button>
  </div>
</div>

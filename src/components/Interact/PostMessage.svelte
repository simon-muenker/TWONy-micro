<script module>
  import { userPost } from "@stores/feed";

  import Button from "@components/common/Button.svelte";
</script>

<script lang="ts">
  let message: string = $state("");

  function sendPost() {
    if (message == "") {
      return;
    }
    userPost(message);
    message = "";
  }
</script>

<div class="flex flex-col gap-4">
  <div class="flex gap-4">
    <span class="inline-block w-8 text-3xl">👤</span>
    <textarea
      name=""
      id=""
      class="grow resize-none border-0 bg-transparent p-1 text-lg text-slate-700 focus:outline-0"
      placeholder="What is happening?!"
      bind:value={message}
    ></textarea>
  </div>
  <div class="flex place-content-between items-center gap-2">
    <span class="select-none text-xs text-slate-500">
      Generated content may be inaccurate or false.
    </span>
    <Button>
      <button onclick={sendPost}>Post</button>
    </Button>
  </div>
</div>

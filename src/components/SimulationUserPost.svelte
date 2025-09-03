<script module>
  import Icon from "@iconify/svelte";

  import { post } from "@stores/feed";
  import { personaUserStore } from "@stores/personas";
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
      rows="3"
      bind:value={message}
    ></textarea>
    <div class="self-end">
      <button class="button base blue" onclick={() => sendPost()}>
         <Icon
            icon="mdi:send"
            class="mr-1 inline-block h-5 w-5"
          />
        Post
      </button>
    </div>
  </div>
</div>

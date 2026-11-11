<script module>
  import Icon from "@components/atoms/Icon.svelte";

  import { post } from "@stores/feed";
  import { personaUserStore } from "@stores/personas";
  import { setNotice } from "@stores/simulation";
  import { ApiError } from "@api/client";
</script>

<script lang="ts">
  let message: string = $state("");
  let sending: boolean = $state(false);

  let canSend = $derived(message.trim().length >= 2 && !sending);

  async function sendPost(): Promise<void> {
    if (!canSend) return;

    const content = message.trim();
    sending = true;

    try {
      await post(content);
      message = "";
      setNotice(null);
    } catch (error) {
      // keep the draft so nothing the user typed is lost
      const needsApiKey = error instanceof ApiError && error.isAuthError;
      setNotice({
        kind: "error",
        message: needsApiKey
          ? "Your post could not be analysed: a valid Hugging Face API key is required."
          : `Your post could not be analysed: ${error instanceof Error ? error.message : String(error)}`,
        needsApiKey,
      });
    } finally {
      sending = false;
    }
  }

  function onKeydown(event: KeyboardEvent): void {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      sendPost();
    }
  }
</script>

<div class="flex flex-col gap-4 sm:flex-row">
  <span class="hidden w-8 text-3xl sm:inline-block" aria-hidden="true">
    {$personaUserStore[0].icon}
  </span>
  <textarea
    aria-label="Write a post"
    class="grow resize-none border-0 bg-transparent p-1 text-lg text-slate-700 focus:outline-0"
    placeholder="What is happening?!"
    rows="3"
    bind:value={message}
    onkeydown={onKeydown}
  ></textarea>
  <div class="self-end">
    <button
      type="button"
      class="button base blue"
      onclick={sendPost}
      disabled={!canSend}
    >
      <Icon icon="mdi:send" class="mr-1 inline-block h-5 w-5" />
      {sending ? "Posting…" : "Post"}
    </button>
  </div>
</div>

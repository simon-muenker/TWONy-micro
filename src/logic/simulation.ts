import { ApiError } from "@api/client";

import { clamp, sample } from "@common/util";

import { settingsAgentStore, settingsSimulationStore } from "@stores/settings";
import {
  getRandomActivePersona,
  personaActiveAgentsStore,
  personaUserStore,
  personasReady,
  type Persona,
} from "@stores/personas";
import { feedStore } from "@stores/feed";
import { setNotice } from "@stores/simulation";

import { agentPost, agentReply } from "@logic/agent";

const MIN_TICK_TIME = 100;
const MAX_TICK_TIME = 10_000;
const MAX_SELECTION_ATTEMPTS = 20;
const MAX_CONSECUTIVE_FAILURES = 3;

function choosePostParameters(): Persona | undefined {
  const lastPost = feedStore.get().at(-1)?.post;

  for (let attempt = 0; attempt < MAX_SELECTION_ATTEMPTS; attempt++) {
    const persona = getRandomActivePersona();
    if (!persona) return undefined;

    // do not post twice in a row
    if (!lastPost || lastPost.name !== persona.name) return persona;
  }

  return undefined;
}

function chooseReplyParameters(): [number, Persona] | undefined {
  const feed = feedStore.get();
  if (feed.length === 0) return undefined;

  const userName = personaUserStore.get()[0]?.name;

  // Collect indices of all threads created by the user
  const userThreadIndices = feed
    .map((t, i) => (t.post.name === userName ? i : -1))
    .filter((i) => i !== -1);

  for (let attempt = 0; attempt < MAX_SELECTION_ATTEMPTS; attempt++) {
    const persona = getRandomActivePersona();
    if (!persona) return undefined;

    let selectedThreadID: number;

    // 50% chance to select a user's post if one exists
    if (userThreadIndices.length > 0 && Math.random() < 0.5) {
      selectedThreadID = sample(userThreadIndices) as number;
    } else {
      // favor recent threads: the larger of two uniform draws
      selectedThreadID = Math.max(
        Math.floor(Math.random() * feed.length),
        Math.floor(Math.random() * feed.length),
      );
    }

    const thread = feed[selectedThreadID];
    const lastItem = thread.replies?.at(-1) ?? thread.post;

    // do not reply to your own post or your own latest comment
    if (lastItem.name !== persona.name) return [selectedThreadID, persona];
  }

  return undefined;
}

function stop(): void {
  settingsSimulationStore.setKey("running", false);
}

/** Performs one simulation step. Returns false if the simulation must halt. */
async function tick(): Promise<boolean> {
  await personasReady;

  if (!settingsSimulationStore.get().apiKey?.trim()) {
    setNotice({
      kind: "error",
      message: "A Hugging Face API key is required to run the simulation.",
      needsApiKey: true,
    });
    return false;
  }

  if (personaActiveAgentsStore.get().length === 0) {
    setNotice({
      kind: "error",
      message:
        "There are no agent personas. Add or reset personas on the Agents page.",
    });
    return false;
  }

  const { maxThreads } = settingsSimulationStore.get();
  if (feedStore.get().length >= maxThreads) {
    setNotice({
      kind: "info",
      message: `The simulation stopped after reaching ${maxThreads} threads. Reset to start a new run.`,
    });
    return false;
  }

  if (Math.random() < settingsAgentStore.get().postProp) {
    const persona = choosePostParameters();
    if (persona) await agentPost(persona);
  }

  if (!settingsSimulationStore.get().running) return true;

  if (Math.random() < settingsAgentStore.get().replyProp) {
    const replyParameters = chooseReplyParameters();
    if (replyParameters) await agentReply(...replyParameters);
  }

  return true;
}

function describeError(error: unknown): {
  message: string;
  fatal: boolean;
  needsApiKey?: boolean;
} {
  if (error instanceof ApiError) {
    if (error.isAuthError) {
      return {
        message:
          "Hugging Face rejected the API key. Check that it is valid and allowed to call Inference Providers.",
        fatal: true,
        needsApiKey: true,
      };
    }
    if (error.status === 402) {
      return {
        message: `Your Hugging Face inference credits are used up. ${error.message}`,
        fatal: true,
      };
    }
    if (error.isModelError) {
      return {
        message: `The selected language model is not available for your account: ${error.message}`,
        fatal: true,
      };
    }
    return { message: error.message, fatal: false };
  }

  return {
    message: error instanceof Error ? error.message : String(error),
    fatal: false,
  };
}

// Exactly one loop may be active: either a tick is in flight or a timer is pending.
let isRunningTick = false;
let timer: ReturnType<typeof setTimeout> | undefined;
let consecutiveFailures = 0;

function schedule(delay: number): void {
  if (isRunningTick || timer !== undefined) return;
  timer = setTimeout(run, delay);
}

async function run(): Promise<void> {
  timer = undefined;
  if (isRunningTick || !settingsSimulationStore.get().running) return;
  isRunningTick = true;

  let proceed = true;

  try {
    proceed = await tick();
    consecutiveFailures = 0;
  } catch (error) {
    console.error(error);
    consecutiveFailures++;

    const { message, fatal, needsApiKey } = describeError(error);
    proceed = !fatal && consecutiveFailures < MAX_CONSECUTIVE_FAILURES;

    // transient errors are retried silently; only report when giving up
    if (!proceed) setNotice({ kind: "error", message, needsApiKey });
  } finally {
    isRunningTick = false;
  }

  if (!proceed) {
    consecutiveFailures = 0;
    stop();
    return;
  }

  if (settingsSimulationStore.get().running) {
    const tickTime = Number(settingsSimulationStore.get().tickTime) || 2000;
    schedule(clamp(tickTime, MIN_TICK_TIME, MAX_TICK_TIME));
  }
}

// Listeners
let wasRunning = false;

settingsSimulationStore.subscribe((settings) => {
  if (settings.running && !wasRunning) {
    setNotice(null);
    schedule(0);
  }

  if (!settings.running && timer !== undefined) {
    clearTimeout(timer);
    timer = undefined;
  }

  wasRunning = settings.running;
});

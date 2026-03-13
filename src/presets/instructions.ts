import type { Instructions } from "@stores/instructions";

export const instructionsDefault: Instructions = {
  post: {
    content:
      "Write one tweet-style post (max 20 words) in your persona's voice about a current societal or political concern. Sound authentic and emotionally grounded.",
    role: "system",
  },
  reply: {
    content:
      "Reply with one tweet-style response (max 20 words) in your persona's voice to the content below. Reflect your interests, stance, and emotional tone.",
    role: "system",
  },
};

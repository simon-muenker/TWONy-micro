import type { Instructions } from "@stores/instructions";

export const instructionsDefault: Instructions = {
  post: {
    content: "Write a Tweet (max 20 words) about what concerns you currently.",
    role: "system",
  },
  reply: {
    content:
      "Reply to the following content with a Tweet (max 20 words) with respect to your interests.",
    role: "system",
  },
};

// The default agent personas are large (~220 kB). This module is only loaded
// on demand (first visit or reset), see `resetPersonas` in @stores/personas.
import type { Persona } from "@stores/personas";

import personasJson from "../../public/personas.json";

type StaticPersona = {
  combined_representation?: string;
  username?: string;
  " username"?: string;
  emoji?: string;
};

function toPersona(raw: StaticPersona, index: number): Persona {
  const name = (raw.username ?? raw[" username"] ?? "").trim();
  const icon = (raw.emoji ?? "").trim();

  return {
    icon: icon.length > 0 ? icon : "❓",
    name: name.length > 0 ? name : `agent_${index + 1}`,
    instruction: (raw.combined_representation ?? "").trim(),
    active: true,
  };
}

export const personaAgentsDefault: Array<Persona> = (
  personasJson as Array<StaticPersona>
).map((persona, index) => toPersona(persona, index));

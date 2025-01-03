import _ from "lodash";
import { v4 as uuid } from "uuid";
import { logger } from "@nanostores/logger";

import { computed } from "nanostores";
import { persistentMap } from "@nanostores/persistent";

import { STORE_PARSER } from "@stores/constants";

import { personaUserDefault, personaAgentsDefault } from "@presets/personas";

// Type Definitions
export type Persona = {
  icon: string;
  name: string;
  instruction: string;
  active: boolean;
};

// Store Management
export const personaUserStore = persistentMap<Array<Persona>>(
  "personaUser:",
  structuredClone(personaUserDefault),
  STORE_PARSER,
);

export const personaAgentsStore = persistentMap<Array<Persona>>(
  "personaAgents:",
  [],
  STORE_PARSER,
);

logger({
  personaUser: personaUserStore,
  personaAgents: personaAgentsStore,
});

// Derived Stores
export const personaActiveAgentsStore = computed(
  personaAgentsStore,
  (agents: Array<Persona>): Array<Persona> => {
    return Object.values(agents).filter((agent) => agent.active);
  },
);

// Getters
export function getRandomActivePersona(): Persona {
  return _.sample(personaActiveAgentsStore.get()) as Persona;
}

// Modifiers
export function resetPersonas(): void {
  personaAgentsStore.set(structuredClone(personaAgentsDefault));
}

export function addPersona(persona: Persona): void {
  personaAgentsStore.set([persona, ...Object.values(personaAgentsStore.get())]);
}

export function addPersonaDummy(): void {
  addPersona({
    icon: "❓",
    name: `UnamedAgent_${uuid().slice(0, 8)}`,
    instruction: "Describe its behavior...",
    active: true,
  });
}

export function updatePersona(persona: Persona): void {
  personaAgentsStore.set(
    Object.values(personaAgentsStore.get()).map((p) =>
      p.name === persona.name ? persona : p,
    ),
  );
}

export function updatePersonaByID(id: number, persona: Persona): void {
  let newPersonas = personaAgentsStore.get();
  newPersonas[id] = persona;

  personaAgentsStore.set(newPersonas);
}

export function removePersona(persona: Persona): void {
  personaAgentsStore.set(
    Object.values(personaAgentsStore.get()).filter(
      (p) => p.name !== persona.name,
    ),
  );
}

// Constructors
if (Object.values(personaAgentsStore.get()).length == 0) {
  console.debug("> Resetting Personas");
  resetPersonas();
}

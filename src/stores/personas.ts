import { computed } from "nanostores";
import { persistentMap } from "@nanostores/persistent";

import { sample } from "@common/util";

import { STORE_PARSER } from "@stores/_constants";
import { devLogger } from "@stores/_logger";

import { personaUserDefault } from "@presets/personas";

// Type Definitions
export type Persona = {
  icon: string;
  name: string;
  instruction: string;
  active: boolean;
};

/** Type guard for uploaded persona files. */
export function isPersonaList(value: unknown): value is Array<Persona> {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof item.icon === "string" &&
        typeof item.name === "string" &&
        typeof item.instruction === "string",
    )
  );
}

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

devLogger({
  personaUser: personaUserStore,
  personaAgents: personaAgentsStore,
});

// Derived Stores
export const personaActiveAgentsStore = computed(
  personaAgentsStore,
  (agents: Array<Persona>): Array<Persona> => {
    return Object.values(agents).filter((agent) => agent.active !== false);
  },
);

// Getters
export function getRandomActivePersona(): Persona | undefined {
  return sample(personaActiveAgentsStore.get());
}

// Modifiers
export function setPersonas(personas: Array<Persona>): void {
  personaAgentsStore.set(
    personas.map((persona) => ({
      ...persona,
      active: persona.active !== false,
    })),
  );
}

export async function resetPersonas(): Promise<void> {
  const { personaAgentsDefault } = await import("@presets/personasAgents");
  personaAgentsStore.set(structuredClone(personaAgentsDefault));
}

export function addPersona(persona: Persona): void {
  personaAgentsStore.set([persona, ...Object.values(personaAgentsStore.get())]);
}

export function addPersonaDummy(): void {
  addPersona({
    icon: "❓",
    name: `unknown_${Math.random().toString(36).slice(2, 6)}`,
    instruction: "Describe its behavior...",
    active: true,
  });
}

export function updatePersonaByID(id: number, persona: Persona): void {
  personaAgentsStore.set(
    Object.values(personaAgentsStore.get()).map((p, index) =>
      index === id ? persona : p,
    ),
  );
}

export function removePersonaByID(id: number): void {
  personaAgentsStore.set(
    Object.values(personaAgentsStore.get()).filter((_, index) => index !== id),
  );
}

// Constructors

/**
 * Resolves once agent personas are available. On the first visit the default
 * personas are fetched lazily; afterwards they are restored from storage.
 */
export const personasReady: Promise<void> =
  !import.meta.env.SSR && Object.values(personaAgentsStore.get()).length === 0
    ? resetPersonas().catch((error) => console.error(error))
    : Promise.resolve();

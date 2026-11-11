import { atom } from "nanostores";

export type SimulationNotice = {
  kind: "error" | "info";
  message: string;
  /** Suggest opening the introduction page to (re-)enter the API key. */
  needsApiKey?: boolean;
};

/** Transient, non-persisted feedback about the simulation shown above the feed. */
export const simulationNoticeStore = atom<SimulationNotice | null>(null);

export function setNotice(notice: SimulationNotice | null): void {
  simulationNoticeStore.set(notice);
}

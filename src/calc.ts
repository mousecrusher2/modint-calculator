import { invoke } from "@tauri-apps/api/core";

export type Operation = "Add" | "Subtract" | "Multiply" | "Divide" | "Equal" | "Clear" | "FlipMod" | { Num: number };

export type State = {
  disp: number;
  modulo: number;
}

export const enum Mod {
  Mod998244353 = 998244353,
  Mod1000000007 = 1000000007,
}

export async function sendEvent(op: Operation): Promise<number> {
  const state: State = await invoke("send_event", { op });
  return state.disp;
}

export async function sendModEvent(): Promise<State> {
  return await invoke("send_event", { op: "FlipMod" });
}

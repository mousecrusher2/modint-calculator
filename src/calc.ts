import { invoke } from "@tauri-apps/api/core";
import { Mod } from "./modulo";

export type Operation = "Add" | "Subtract" | "Multiply" | "Divide";
export async function calc({ op, lhs, rhs, mod }: { op: Operation; lhs: string; rhs: string; mod: Mod }): Promise<string> {
  return await invoke("calc", { op, lhs, rhs, modulo: mod });
}

import { invoke } from "@tauri-apps/api/core";

export type Operation = "Add" | "Subtract" | "Multiply" | "Divide";
type Modulo = "Mod998244353" | "Mod1000000007";

export async function calc({ op, lhs, rhs, modulo }: { op: Operation; lhs: string; rhs: string; modulo: Modulo }): Promise<string> {
  return await invoke("calc", { op, lhs, rhs, modulo });
}

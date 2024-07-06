// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use ac_library::{ModInt1000000007, ModInt998244353, Modulus, StaticModInt};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(serde::Deserialize, Clone, Copy, PartialEq, Eq, Hash, Debug)]
enum Operation {
    Add,
    Subtract,
    Multiply,
    Divide,
}

#[derive(serde::Deserialize, Clone, Copy, PartialEq, Eq, Hash, Debug)]
enum Modulo {
    Mod998244353 = 998244353,
    Mod1000000007 = 1000000007,
}

#[tauri::command]
fn calc(op: Operation, lhs: String, rhs: String, modulo: Modulo) -> Result<u32, String> {
    let lhs: u64 = lhs.parse().map_err(|_| "lhs is not a number")?;
    let rhs: u64 = rhs.parse().map_err(|_| "rhs is not a number")?;
    match modulo {
        Modulo::Mod998244353 => {
            let lhs = ModInt998244353::new(lhs);
            let rhs = ModInt998244353::new(rhs);
            Ok(internal_calc(op, lhs, rhs))
        }
        Modulo::Mod1000000007 => {
            let lhs = ModInt1000000007::new(lhs);
            let rhs = ModInt1000000007::new(rhs);
            Ok(internal_calc(op, lhs, rhs))
        }
    }
}

fn internal_calc<M: Modulus>(op: Operation, lhs: StaticModInt<M>, rhs: StaticModInt<M>) -> u32 {
    match op {
        Operation::Add => (lhs + rhs).val(),
        Operation::Subtract => (lhs - rhs).val(),
        Operation::Multiply => (lhs * rhs).val(),
        Operation::Divide => (lhs / rhs).val(),
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet, calc])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn deserialize_operation() {
        let op: Operation = serde_json::from_str(r#""Add""#).unwrap();
        assert_eq!(op, Operation::Add);
    }
}

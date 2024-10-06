// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Mutex;

use ac_library::{ModInt1000000007, ModInt998244353};
use tauri::{Manager as _, State};

#[derive(serde::Deserialize, Clone, Copy, PartialEq, Eq, Hash, Debug)]
enum Operation {
    Add,
    Subtract,
    Multiply,
    Divide,
    Equal,
    Clear,
    FlipMod,
    Num(u8),
}

#[derive(serde::Serialize, Clone, Copy, PartialEq, Eq, Hash, Debug, Default)]
#[repr(u32)]
enum Modulo {
    #[default]
    #[serde(rename = "998244353")]
    Mod998244353 = 998244353u32,
    #[serde(rename = "1000000007")]
    Mod1000000007 = 1000000007u32,
}

impl Modulo {
    fn add(self, lhs: u32, rhs: u64) -> u32 {
        let lhs = lhs % self as u32;
        let rhs = rhs % self as u64;
        (lhs + rhs as u32) % self as u32
    }

    fn sub(self, lhs: u32, rhs: u64) -> u32 {
        let lhs = lhs % self as u32;
        let rhs = rhs % self as u64;
        (lhs + self as u32 - rhs as u32) % self as u32
    }

    fn mul(self, lhs: u32, rhs: u64) -> u32 {
        let lhs = lhs % self as u32;
        let rhs = rhs % self as u64;
        (lhs as u64 * rhs % self as u64) as u32
    }

    fn div(self, lhs: u32, rhs: u64) -> u32 {
        match self {
            Modulo::Mod998244353 => {
                let lhs = ModInt998244353::new(lhs);
                (lhs / rhs).val()
            }
            Modulo::Mod1000000007 => {
                let lhs = ModInt1000000007::new(lhs);
                (lhs / rhs).val()
            }
        }
    }

    fn flip(self) -> Self {
        match self {
            Modulo::Mod998244353 => Modulo::Mod1000000007,
            Modulo::Mod1000000007 => Modulo::Mod998244353,
        }
    }

    fn calc(self, lhs: u32, rhs: u64, op: Operation) -> u32 {
        match op {
            Operation::Add => self.add(lhs, rhs),
            Operation::Subtract => self.sub(lhs, rhs),
            Operation::Multiply => self.mul(lhs, rhs),
            Operation::Divide => self.div(lhs, rhs),
            _ => unreachable!(),
        }
    }
}

#[derive(Clone, Copy, PartialEq, Eq, Hash, Debug)]
enum AppState {
    Start {
        rhs: u64,
        modulo: Modulo,
    },
    LOp {
        lhs: u32,
        op: Operation,
        modulo: Modulo,
    },
    LROp {
        lhs: u32,
        op: Operation,
        rhs: u64,
        modulo: Modulo,
    },
}

impl Default for AppState {
    fn default() -> Self {
        AppState::Start {
            rhs: 0,
            modulo: Modulo::default(),
        }
    }
}

#[derive(serde::Serialize, Clone, Copy, PartialEq, Eq, Hash, Debug)]
struct FrontState {
    disp: u64,
    modulo: Modulo,
}

#[tauri::command]
fn send_event(state: State<Mutex<AppState>>, op: Operation) -> FrontState {
    let mut state = state.lock().unwrap();
    match *state {
        AppState::Start { rhs, modulo } => match op {
            Operation::Add | Operation::Subtract | Operation::Multiply | Operation::Divide => {
                let lhs = (rhs % modulo as u64) as u32;
                *state = AppState::LOp { lhs, op, modulo };
                FrontState {
                    disp: lhs as u64,
                    modulo,
                }
            }
            Operation::Equal => FrontState { disp: rhs, modulo },
            Operation::Clear => {
                *state = AppState::Start { rhs: 0, modulo };
                FrontState { disp: 0, modulo }
            }
            Operation::FlipMod => {
                *state = AppState::Start {
                    rhs,
                    modulo: modulo.flip(),
                };
                FrontState {
                    disp: rhs,
                    modulo: modulo.flip(),
                }
            }
            Operation::Num(n) => {
                let keta = if rhs == 0 { 1 } else { rhs.ilog10() + 1 };
                if keta <= 9 {
                    let rhs = rhs * 10 + n as u64;
                    *state = AppState::Start { rhs, modulo };
                    FrontState { disp: rhs, modulo }
                } else {
                    FrontState { disp: rhs, modulo }
                }
            }
        },
        AppState::LOp {
            lhs,
            op: bop,
            modulo,
        } => match op {
            Operation::Add | Operation::Subtract | Operation::Multiply | Operation::Divide => {
                *state = AppState::LOp { lhs, op, modulo };
                FrontState {
                    disp: lhs as u64,
                    modulo,
                }
            }
            Operation::Equal => {
                *state = AppState::Start {
                    rhs: lhs as u64,
                    modulo,
                };
                FrontState {
                    disp: lhs as u64,
                    modulo,
                }
            }
            Operation::Clear => {
                *state = AppState::Start { rhs: 0, modulo };
                FrontState { disp: 0, modulo }
            }
            Operation::FlipMod => {
                *state = AppState::LOp {
                    lhs,
                    op: bop,
                    modulo: modulo.flip(),
                };
                FrontState {
                    disp: lhs as u64,
                    modulo: modulo.flip(),
                }
            }
            Operation::Num(n) => {
                *state = AppState::LROp {
                    lhs,
                    op: bop,
                    rhs: n as u64,
                    modulo,
                };
                FrontState {
                    disp: n as u64,
                    modulo,
                }
            }
        },
        AppState::LROp {
            lhs,
            op: bop,
            rhs,
            modulo,
        } => match op {
            Operation::Add | Operation::Subtract | Operation::Multiply | Operation::Divide => {
                let lhs = modulo.calc(lhs, rhs, bop);
                *state = AppState::LOp { lhs, op, modulo };
                FrontState {
                    disp: lhs as u64,
                    modulo,
                }
            }
            Operation::Equal => {
                let lhs = modulo.calc(lhs, rhs, bop);
                *state = AppState::Start {
                    rhs: lhs as u64,
                    modulo,
                };
                FrontState {
                    disp: lhs as u64,
                    modulo,
                }
            }
            Operation::Clear => {
                *state = AppState::Start { rhs: 0, modulo };
                FrontState { disp: 0, modulo }
            }
            Operation::FlipMod => {
                *state = AppState::LROp {
                    lhs,
                    op: bop,
                    rhs,
                    modulo: modulo.flip(),
                };
                FrontState {
                    disp: rhs,
                    modulo: modulo.flip(),
                }
            }
            Operation::Num(n) => {
                let keta = if rhs == 0 { 1 } else { rhs.ilog10() + 1 };
                if keta <= 9 {
                    let rhs = rhs * 10 + n as u64;
                    *state = AppState::LROp {
                        lhs,
                        op: bop,
                        rhs,
                        modulo,
                    };
                    FrontState { disp: rhs, modulo }
                } else {
                    FrontState { disp: rhs, modulo }
                }
            }
        },
    }
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            app.manage(Mutex::new(AppState::default()));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![send_event])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

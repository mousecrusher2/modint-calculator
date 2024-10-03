import { calc, Operation } from "../calc";
import { Mod } from "../modulo";

export function OneNineButton({
  n,
  setstate,
}: {
  n: number;
  setstate: React.Dispatch<React.SetStateAction<string>>;
}) {
  if (n < 1 || n > 9) {
    throw new Error("n must be between 1 and 9");
  }
  const onclick = () => {
    setstate((state) => {
      if (state === "0") {
        return n.toString();
      } else if (state.length < 10) {
        return state + n.toString();
      } else {
        return state;
      }
    });
  };
  return (
    <button className="pad npad" onClick={onclick}>
      {n}
    </button>
  );
}

export function ZeroButton({
  setstate,
}: {
  setstate: React.Dispatch<React.SetStateAction<string>>;
}) {
  const onclick = () => {
    setstate((state) => {
      if (state === "0") {
        return "0";
      } else {
        return state + "0";
      }
    });
  };
  return (
    <button className="pad npad" onClick={onclick}>
      0
    </button>
  );
}

export function EqualButton({
  lhs,
  setLhs,
  state,
  setState,
  op,
  setOp,
  mod,
}: {
  lhs: string;
  setLhs: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  op: undefined | Operation;
  setOp: React.Dispatch<React.SetStateAction<undefined | Operation>>;
  mod: Mod;
}) {
  const onclick = async () => {
    if (!(op === undefined)) {
      const res = await calc({ op, lhs, rhs: state, mod });
      setLhs("");
      setState(res.toString());
      setOp(undefined);
    }
  };
  return (
    <button className="pad" onClick={onclick}>
      =
    </button>
  );
}

export function PlusButton({
  lhs,
  setLhs,
  state,
  setState,
  op,
  setOp,
  mod,
}: {
  lhs: string;
  setLhs: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  op: undefined | Operation;
  setOp: React.Dispatch<React.SetStateAction<undefined | Operation>>;
  mod: Mod;
}) {
  const onclick = async () => {
    if (op === undefined) {
      setState((state) => {
        setLhs(state);
        return "0";
      });
      setOp("Add");
    } else {
      const res = await calc({ op, lhs, rhs: state, mod });
      setLhs(res.toString());
      setState("0");
      setOp("Add");
    }
  };
  return (
    <button className="pad" onClick={onclick}>
      +
    </button>
  );
}

export function MinusButton({
  lhs,
  setLhs,
  state,
  setState,
  op,
  setOp,
  mod,
}: {
  lhs: string;
  setLhs: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  op: undefined | Operation;
  setOp: React.Dispatch<React.SetStateAction<undefined | Operation>>;
  mod: Mod;
}) {
  const onclick = async () => {
    if (op === undefined) {
      setState((state) => {
        setLhs(state);
        return "0";
      });
      setOp("Subtract");
    } else {
      const res = await calc({ op, lhs, rhs: state, mod });
      setLhs(res.toString());
      setState("0");
      setOp("Subtract");
    }
  };
  return (
    <button className="pad" onClick={onclick}>
      -
    </button>
  );
}

export function MulButton({
  lhs,
  setLhs,
  state,
  setState,
  op,
  setOp,
  mod,
}: {
  lhs: string;
  setLhs: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  op: undefined | Operation;
  setOp: React.Dispatch<React.SetStateAction<undefined | Operation>>;
  mod: Mod;
}) {
  const onclick = async () => {
    if (op === undefined) {
      setState((state) => {
        setLhs(state);
        return "0";
      });
      setOp("Multiply");
    } else {
      const res = await calc({ op, lhs, rhs: state, mod });
      setLhs(res.toString());
      setState("0");
      setOp("Multiply");
    }
  };
  return (
    <button className="pad" onClick={onclick}>
      ×
    </button>
  );
}

export function DivButton({
  lhs,
  setLhs,
  state,
  setState,
  op,
  setOp,
  mod,
}: {
  lhs: string;
  setLhs: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  op: undefined | Operation;
  setOp: React.Dispatch<React.SetStateAction<undefined | Operation>>;
  mod: Mod;
}) {
  const onclick = async () => {
    if (op === undefined) {
      setState((state) => {
        setLhs(state);
        return "0";
      });
      setOp("Divide");
    } else {
      const res = await calc({ op, lhs, rhs: state, mod });
      setLhs(res.toString());
      setState("0");
      setOp("Divide");
    }
  };
  return (
    <button className="pad" onClick={onclick}>
      ÷
    </button>
  );
}

export function ModSwitchButton({
  mod,
  setMod,
}: {
  mod: Mod;
  setMod: React.Dispatch<React.SetStateAction<Mod>>;
}) {
  const onc = () => {
    setMod((mod) => {
      switch (mod) {
        case Mod.Mod998244353:
          return Mod.Mod1000000007;
        case Mod.Mod1000000007:
          return Mod.Mod998244353;
      }
    });
  };
  return (
    <button className="mod" onClick={onc}>
      {mod}
    </button>
  );
}

export function ClearButton({
  setLhs,
  setState,
  setOp,
}: {
  setLhs: React.Dispatch<React.SetStateAction<string>>;
  setState: React.Dispatch<React.SetStateAction<string>>;
  setOp: React.Dispatch<React.SetStateAction<undefined | Operation>>;
}) {
  const onclick = () => {
    setLhs("");
    setState("0");
    setOp(undefined);
  };
  return (
    <button className="pad" onClick={onclick}>
      C
    </button>
  );
}

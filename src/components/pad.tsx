import { Mod, sendEvent, sendModEvent } from "../calc";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export function NumberButton({
  n,
  setDisp,
}: {
  n: number;
  setDisp: SetState<number>;
}) {
  if (n < 0 || n > 9) {
    throw new Error("n must be between 0 and 9");
  }
  const onclick = async () => {
    setDisp(await sendEvent({ Num: n }));
  };
  return (
    <button className="pad npad" onClick={onclick}>
      {n}
    </button>
  );
}

export function EqualButton({ setDisp }: { setDisp: SetState<number> }) {
  const onclick = async () => {
    setDisp(await sendEvent("Equal"));
  };
  return (
    <button className="pad" onClick={onclick}>
      ＝
    </button>
  );
}

export function PlusButton({ setDisp }: { setDisp: SetState<number> }) {
  const onclick = async () => {
    setDisp(await sendEvent("Add"));
  };
  return (
    <button className="pad" onClick={onclick}>
      ＋
    </button>
  );
}

export function MinusButton({ setDisp }: { setDisp: SetState<number> }) {
  const onclick = async () => {
    setDisp(await sendEvent("Subtract"));
  };
  return (
    <button className="pad" onClick={onclick}>
      －
    </button>
  );
}

export function MulButton({ setDisp }: { setDisp: SetState<number> }) {
  const onclick = async () => {
    setDisp(await sendEvent("Multiply"));
  };
  return (
    <button className="pad" onClick={onclick}>
      ×
    </button>
  );
}

export function DivButton({ setDisp }: { setDisp: SetState<number> }) {
  const onclick = async () => {
    setDisp(await sendEvent("Divide"));
  };
  return (
    <button className="pad" onClick={onclick}>
      ÷
    </button>
  );
}

export function ModSwitchButton({
  mod,
  setDisp,
  setMod,
}: {
  mod: Mod;
  setDisp: SetState<number>;
  setMod: SetState<Mod>;
}) {
  const onc = async () => {
    const state = await sendModEvent();
    setDisp(state.disp);
    setMod(state.modulo);
  };
  return (
    <button className="mod" onClick={onc}>
      {mod}
    </button>
  );
}

export function ClearButton({ setDisp }: { setDisp: SetState<number> }) {
  const onclick = async () => {
    setDisp(await sendEvent("Clear"));
  };
  return (
    <button className="pad" onClick={onclick}>
      Ｃ
    </button>
  );
}

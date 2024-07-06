import { useState } from "react";
import {
  EqualButton,
  MinusButton,
  MulButton,
  OneNineButton,
  PlusButton,
  ZeroButton,
  ModSwitchButton,
  ClearButton,
  DivButton,
} from "./components/pad";
import { Display } from "./components/display";
import { Mod } from "./modulo";
import { Operation } from "./calc";

function App() {
  const [state, setState] = useState("0");
  const [mod, setMod] = useState(Mod.Mod998244353);
  const [lhs, setLhs] = useState("");
  const [op, setOp] = useState(undefined as undefined | Operation);
  return (
    <div className="fill">
      <div className="dispblock">
        <Display s={state} />
      </div>
      <div className="padarea">
        <table className="tb">
          <tbody>
            <tr>
              <td colSpan={2} className="cell">
                <ModSwitchButton mod={mod} setMod={setMod} />
              </td>
              <td className="cell">
                <ClearButton
                  setLhs={setLhs}
                  setState={setState}
                  setOp={setOp}
                />
              </td>
              <td className="cell">
                <DivButton
                  lhs={lhs}
                  setLhs={setLhs}
                  state={state}
                  setState={setState}
                  op={op}
                  setOp={setOp}
                  mod={mod}
                />
              </td>
            </tr>
            {[1, 4, 7].map((n) => (
              <tr key={n}>
                {[n, n + 1, n + 2].map((m) => (
                  <td key={m} className="cell">
                    <OneNineButton n={m} setstate={setState} />
                  </td>
                ))}
                {(() => {
                  switch (n) {
                    case 1:
                      return (
                        <td className="cell">
                          <MulButton
                            lhs={lhs}
                            setLhs={setLhs}
                            state={state}
                            setState={setState}
                            op={op}
                            setOp={setOp}
                            mod={mod}
                          />
                        </td>
                      );
                    case 4:
                      return (
                        <td className="cell">
                          <MinusButton
                            lhs={lhs}
                            setLhs={setLhs}
                            state={state}
                            setState={setState}
                            op={op}
                            setOp={setOp}
                            mod={mod}
                          />
                        </td>
                      );
                    case 7:
                      return (
                        <td className="cell">
                          <PlusButton
                            lhs={lhs}
                            setLhs={setLhs}
                            state={state}
                            setState={setState}
                            op={op}
                            setOp={setOp}
                            mod={mod}
                          />
                        </td>
                      );
                  }
                })()}
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="cell">
                <ZeroButton setstate={setState} />
              </td>
              <td className="cell">
                <EqualButton
                  lhs={lhs}
                  setLhs={setLhs}
                  state={state}
                  setState={setState}
                  op={op}
                  setOp={setOp}
                  mod={mod}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

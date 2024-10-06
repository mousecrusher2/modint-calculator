import { useState } from "react";
import {
  EqualButton,
  MinusButton,
  MulButton,
  PlusButton,
  ModSwitchButton,
  ClearButton,
  DivButton,
  NumberButton,
} from "./components/pad";
import { Display } from "./components/display";
import { Mod } from "./calc";

function App() {
  const [disp, setDisp] = useState(0);
  const [mod, setMod] = useState(Mod.Mod998244353);
  return (
    <div className="fill">
      <div className="dispblock">
        <Display s={disp} />
      </div>
      <div className="padarea">
        <table className="tb">
          <tbody>
            <tr className="gyou">
              <td colSpan={2} className="cell">
                <ModSwitchButton mod={mod} setMod={setMod} setDisp={setDisp} />
              </td>
              <td className="cell">
                <ClearButton setDisp={setDisp} />
              </td>
              <td className="cell">
                <DivButton setDisp={setDisp} />
              </td>
            </tr>
            {[1, 4, 7].map((n) => (
              <tr key={n} className="gyou">
                {[n, n + 1, n + 2].map((m) => (
                  <td key={m} className="cell">
                    <NumberButton n={m} setDisp={setDisp} />
                  </td>
                ))}
                {(() => {
                  switch (n) {
                    case 1:
                      return (
                        <td className="cell">
                          <MulButton setDisp={setDisp} />
                        </td>
                      );
                    case 4:
                      return (
                        <td className="cell">
                          <MinusButton setDisp={setDisp} />
                        </td>
                      );
                    case 7:
                      return (
                        <td className="cell">
                          <PlusButton setDisp={setDisp} />
                        </td>
                      );
                  }
                })()}
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="cell">
                <NumberButton n={0} setDisp={setDisp} />
              </td>
              <td className="cell">
                <EqualButton setDisp={setDisp} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

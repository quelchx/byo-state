import viteLogo from "/vite.svg";
import reactLogo from "../assets/react.svg";

import { atom, useAtom, useAtomValue } from "../store/diy-jotai-store";

const countAtom = atom(10000);
const otherCountAtom = atom(20000);

const total = atom((get) => get(countAtom) + get(otherCountAtom));

const NumberDisplay = () => {
  const count = useAtomValue(countAtom);
  const otherCount = useAtomValue(otherCountAtom);
  return (
    <>
      <span>Current Count: {count}</span>
      <br />
      <span>Other Count: {otherCount}</span>
      <br />
      <span>Total: {useAtomValue(total)}</span>
    </>
  );
};

export function DIYStateComponent() {
  // const [count, setCount] = useAtom(countAtom);
  const [count, setCount] = useAtom(countAtom);
  const [otherCount, setOtherCount] = useAtom(otherCountAtom);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <NumberDisplay />
      <hr />
      <label htmlFor="number">Set count:</label>
      <input
        style={{ marginLeft: "10px", width: "100px" }}
        type="number"
        value={count}
        onChange={(e) => setCount(+e.target.value)}
      />
      <br />
      <label htmlFor="number">Set other count:</label>
      <input
        style={{ marginLeft: "10px", width: "100px" }}
        type="number"
        value={otherCount}
        onChange={(e) => setOtherCount(+e.target.value)}
      />
      <div className="card">
        <button onClick={() => setCount(count + 1)}>Increment count</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

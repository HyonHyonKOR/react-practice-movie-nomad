import { useState, useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const onClick = () => {
    setValue((prevCounter) => prevCounter + 1);
  };
  console.log("i run all the time");
  useEffect(() => console.log("i only run one time"), []);
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;

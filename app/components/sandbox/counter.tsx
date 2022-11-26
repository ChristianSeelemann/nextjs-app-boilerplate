"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <br />
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <br />
      <button onClick={() => setCount(0)}>Set to 0</button>
    </div>
  );
}

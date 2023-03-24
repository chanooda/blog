"use client";

import React, { useState, useEffect } from "react";

export default function Page() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("lfkjaslkdfjlasdkfj");
    return () => {};
  }, []);

  return (
    <div className="flex gap-4">
      <button onClick={() => setCount((prev) => prev - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount((prev) => prev + 1)}>+</button>
    </div>
  );
}

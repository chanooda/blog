import React from "react";

interface BoardProps {
  children: React.ReactNode;
}

export default function Board({ children }: BoardProps) {
  return (
    <div className="w-full shadow-[0_1px_3px_rgba(0,0,0,0.12),_0_1px_2px_rgba(0,0,0,0.24)] dark:bg-[#1e1e1e] p-4 rounded-md">
      {children}
    </div>
  );
}

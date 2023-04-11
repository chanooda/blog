import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full h-full max-w-[1000px] mx-auto px-4 pb-4 mt-4">
      {children}
    </div>
  );
}

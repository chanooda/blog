"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-4">
      <h1 className="text-3xl font-bold">404 - 존재하지 않는 페이지</h1>
      <button onClick={() => router.back()}>이전 페이지로 돌아가기</button>
    </div>
  );
}

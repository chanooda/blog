"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";

interface WriteNavProps {
  nextQuery: string;
  params: { category: string; next_cursor: string };
}

export default function WriteNav({ nextQuery, params }: WriteNavProps) {
  const router = useRouter();

  return (
    <div className="mt-4 w-full flex justify-end gap-2 items-center">
      {params?.next_cursor && (
        <button className="cursor-pointer" onClick={() => router.back()}>
          <MdNavigateBefore className="text-4xl stroke-gray-900 dark:stroke-gray-50" />
        </button>
      )}
      <Link
        className="h-[36px]"
        href={{
          pathname: `/write/${params?.category}/${nextQuery}`,
        }}
      >
        <button className="cursor-pointer">
          <MdNavigateNext className="text-4xl stroke-gray-900 dark:stroke-gray-50" />
        </button>
      </Link>
    </div>
  );
}

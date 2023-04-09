"use client";

import { MultiSelectListCard } from "@/components/notionBlock";
import { GetDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

interface WriteSidebarProps {
  database: GetDatabaseResponse;
}

export default function WriteSidebar({ database }: WriteSidebarProps) {
  const [showSidebar, setShowSideBar] = useState(false);
  const onClickHamburger = (val: boolean) => {
    setShowSideBar(val);
  };
  return (
    <>
      <div
        className={`py-4 px-4 min-w-[50px] h-full border-r flex-col items-center gap-2  bg-white dark:bg-[#121212] ${
          !showSidebar && "flex"
        } md:hidden `}
      >
        <GiHamburgerMenu
          className="text-2xl cursor-pointer"
          onClick={() => onClickHamburger(true)}
        />
      </div>
      <div
        className={`p-4 min-w-[150px] w-[150px] h-[inherit] border-r absolute z-10  flex-col gap-2 bg-white dark:bg-[#121212] transition-all left-0
        ${!showSidebar ? "left-[-100%]" : "flex left-0"} md:flex md:static`}
      >
        <div
          className="flex justify-end md:hidden"
          onClick={() => onClickHamburger(false)}
        >
          <IoMdClose className="text-2xl cursor-pointer " />
        </div>
        {(database as any)?.properties?.category?.multi_select?.options?.map(
          (el: any) => (
            <Link key={el.key} href={`/write/${el.name}`}>
              <MultiSelectListCard
                size="lg"
                content={el}
                className="hover:scale-105 transition-transform"
              />
            </Link>
          )
        )}
      </div>
    </>
  );
}

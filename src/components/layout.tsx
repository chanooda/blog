"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { FiMoon } from "react-icons/fi";

const nvaList = [
  { name: "Me", location: "/" },
  { name: "Project", location: "/project" },
  { name: "Write", location: "/write/All" },
];

export const Header = () => {
  const [dark, setDark] = useState<null | boolean>(null);
  const pathname = usePathname();

  useEffect(() => {
    setDark(JSON.parse(localStorage?.dark || "false"));
  }, []);
  const changeTheme = () => {
    if (!dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setDark(!dark);
    localStorage.dark = !dark;
  };
  return (
    <div className="w-full h-24 border-b border-gray-300 fixed left-0 bg-white dark:bg-gray-900">
      <div className=" p-4 w-full max-w-[1400px] h-full mx-auto flex gap-4 items-end justify-between">
        <div className="flex gap-3 items-center">
          {nvaList.map((el, i) => (
            <Link
              className={`${pathname === el.location && "text-lg font-bold"}`}
              href={{
                pathname: el?.location,
              }}
              key={i}
            >
              {el.name}
            </Link>
          ))}
        </div>
        <div>
          <button
            onClick={changeTheme}
            className="font-semibold cursor-pointer"
          >
            {dark ? <FiMoon /> : <MdOutlineWbSunny />}
          </button>
        </div>
      </div>
    </div>
  );
};

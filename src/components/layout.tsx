"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { FiMoon } from "react-icons/fi";

export const Header = () => {
  const [dark, setDark] = useState<null | boolean>(null);
  useEffect(() => {
    setDark(JSON.parse(localStorage?.dark));
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
    <div className="w-full h-24 border-b border-gray-300 fixed left-0 bg-gray-50 dark:bg-gray-900">
      <div className=" p-4 w-full max-w-[1400px] h-full mx-auto flex gap-4 items-end justify-between">
        <div className="flex gap-3">
          <Link className="font-semibold" href="/">
            Home
          </Link>
          <Link className="font-semibold" href="/project">
            Project
          </Link>
        </div>
        <div>
          <button onClick={changeTheme} className="font-semibold cursor-pointer">
            {dark ? <FiMoon /> : <MdOutlineWbSunny />}
          </button>
        </div>
      </div>
    </div>
  );
};

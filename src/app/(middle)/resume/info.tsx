import React from "react";
import Board from "@/components/board";
import { IoIosMail } from "react-icons/io";
import { AiFillGithub } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";

export default function Info() {
  return (
    <Board>
      <div className="flex items-end gap-2">
        <h2 className="text-2xl">김찬우</h2>
        <span className="text-[rgba(0,0,0,0.6)] dark:text-[rgba(255,255,255,0.6)]">
          Web Developer
        </span>
      </div>
      <div className="pl-3 mt-2">
        <p>2000.10.07</p>
        <div className="flex items-center gap-2">
          <IoIosMail />
          <a href="mailto:hanrhfqkq@gmail.com">hanrhfqkq@gmail.com</a>
        </div>
        <div className="flex items-center gap-2">
          <AiFillGithub />
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://github.com/chanooda"
          >
            https://github.com/chanooda
          </a>
        </div>
        <div className="flex items-center gap-2">
          <AiFillHome />
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://blog.chanoo.org"
          >
            개발 블로그
          </a>
        </div>
      </div>
    </Board>
  );
}

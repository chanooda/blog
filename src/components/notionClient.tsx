"use client";

import { Block } from "@/types/notionType";
import React from "react";
import Highlight from "react-highlight";
import "react-highlight/node_modules/highlight.js/styles/androidstudio.css";

interface NotionCodeProps {
  block: Block;
}

export const NotionCode = ({ block }: NotionCodeProps) => {
  let codeText = "";
  block?.code?.rich_text?.map((el) => (codeText += el?.text?.content));
  return (
    <div className="w-full [&_>_pre]:w-full">
      <Highlight className={`${block?.code?.language} rounded-md px-5 w-full`}>
        {codeText}
      </Highlight>
    </div>
  );
};

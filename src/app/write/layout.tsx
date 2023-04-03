import React, { ReactNode } from "react";
import { Client } from "@notionhq/client";
import { Metadata } from "next";
import WriteSidebar from "./WriteSidebar";

const notion = new Client({ auth: process.env.NOTION_SECRET });

export const metadata: Metadata = {
  title: "글 - 김찬우 개발 블로그",
  description: "웹 개발자 김찬우의 글",
};

// 글 데이터베이스 가져오기
async function getData() {
  const notion = new Client({ auth: process.env.NOTION_SECRET });
  const database = await notion.databases.retrieve({
    database_id: process.env.NOTION_WRITE_DB_ID as string,
  });

  return database;
}

export default async function WriteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const database = await getData();
  return (
    <div className="w-full h-full flex relative overflow-hidden">
      <WriteSidebar database={database} />
      <div className="w-full min-w-0 overflow-auto">
        <div className="max-w-[1200px] mx-auto p-4">{children}</div>
      </div>
    </div>
  );
}

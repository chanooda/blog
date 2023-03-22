import React, { ReactNode } from "react";
import { Client } from "@notionhq/client";
import Link from "next/link";
import { MultiSelectListCard } from "@/components/notionPage";

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
    <div className="w-full h-full flex">
      <div className="py-4 pr-4 min-w-[150px] w-[150px] h-full border-r hidden md:flex flex-col gap-2 fixed bg-white dark:bg-gray-900">
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
      <div className="p-4 w-full md:ml-[150px] min-w-0">{children}</div>
    </div>
  );
}

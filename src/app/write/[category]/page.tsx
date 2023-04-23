import React from "react";
import { Client } from "@notionhq/client";
import Link from "next/link";
import { MultiSelectList } from "@/components/notionBlock";
import { HiPencil } from "react-icons/hi";
import { formatDate } from "@/libs/notionUtils";
import WriteNav from "@/components/writeNav";
import WriteBoard from "@/components/writeBoard";

async function getData(category: string, next_cursor: string) {
  const notion = new Client({ auth: process.env.NOTION_SECRET });
  const response = await notion.databases.query({
    database_id: process.env.NOTION_WRITE_DB_ID as string,
    page_size: 12,
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
    ...(category !== "all" && {
      filter: { property: "category", multi_select: { contains: category } },
    }),
    ...(next_cursor && {
      start_cursor: next_cursor,
    }),
  });
  return response;
}

export default async function Write({
  params,
}: {
  params: { category: string; next_cursor: string };
}) {
  // console.log(params)
  const data = await getData( decodeURIComponent(params.category), params.next_cursor);
  // console.log(JSON.stringify(data))
  return (
    <div className="w-full pb-8">
      <div className="w-full flex-col flex gap-4">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
          {data.results.map((el: any) => (
            <WriteBoard key={el?.id} write={el} />
          ))}
        </div>
      </div>
      {data?.next_cursor && (
        <WriteNav nextQuery={data?.next_cursor} params={params} />
      )}
    </div>
  );
}

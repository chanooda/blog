import React from "react";
import { Client } from "@notionhq/client";
import WriteNav from "@/components/writeNav";
import WriteBoard from "@/components/writeBoard";

export async function generateStaticParams() {
  const notion = new Client({ auth: process.env.NOTION_SECRET });
  const database = await notion.databases.retrieve({
    database_id: process.env.NOTION_WRITE_DB_ID as string,
  });
  return (database as any)?.properties?.category?.multi_select?.options?.map(
    (el: any) => ({
      category: el.name,
    })
  );
  {
  }
}

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
  const data = await getData(params.category, params.next_cursor);

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

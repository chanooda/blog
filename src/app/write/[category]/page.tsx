import React from "react";
import { Client } from "@notionhq/client";
import Link from "next/link";
import { MultiSelectList } from "@/components/notionBlock";
import { HiPencil } from "react-icons/hi";
import { formatDate } from "@/libs/notionUtils";
import WriteNav from "@/components/writeNav";

async function getData(category: string, next_cursor: string) {
  const notion = new Client({ auth: process.env.NOTION_SECRET });
  const response = await notion.databases.query({
    database_id: process.env.NOTION_WRITE_DB_ID as string,
    page_size: 10,
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
        {data?.results?.map((el: any) => (
          <Link key={el?.id} href={`/page/${el?.id}`}>
            <div className="w-full flex gap-4 cursor-pointer">
              {el?.properties?.image?.files[0] ? (
                <div className="w-[30%] min-w-[100px] max-w-[300px] rounded-md shadow-md aspect-[1.5/0.8] overflow-hidden relative">
                  <img
                    className="object-cover w-full h-full"
                    src={
                      el?.properties?.image?.files[0]?.[
                        el?.properties?.image?.files[0]?.type
                      ]?.url
                    }
                    alt="대표 이미지"
                  />
                </div>
              ) : (
                <div className="w-[30%] min-w-[100px] max-w-[300px] aspect-[1.5/0.8] overflow-hidden bg-slate-100 flex items-center dark:bg-slate-600 justify-center shadow-md rounded-md">
                  <HiPencil className="text-gray-400 text-5xl" />
                </div>
              )}
              <div className="w-full flex flex-col gap-2 min-w-0 flex-1">
                <div className="w-full min-w-0">
                  <h2 className="w-full whitespace-nowrap text-ellipsis overflow-hidden">
                    {el?.properties?.Name?.title[0]?.text?.content}
                  </h2>
                  <span className="text-xs text-gray-500">
                    {formatDate(el?.created_time)}
                  </span>
                </div>
                <MultiSelectList multiSelect={el?.properties?.tags} />
              </div>
            </div>
          </Link>
        ))}
      </div>
      {data?.next_cursor && (
        <WriteNav nextQuery={data?.next_cursor} params={params} />
      )}
    </div>
  );
}

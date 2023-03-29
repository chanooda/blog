import React from "react";
import Link from "next/link";
import { Client } from "@notionhq/client";
import { MultiSelectList } from "@/components/notionPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "프로젝트 - 김찬우 개발 블로그",
  description: "웹 개발자 김찬우의 프로젝트",
};

async function getData() {
  const notion = new Client({ auth: process.env.NOTION_SECRET });
  const response = await notion.databases.query({
    database_id: process.env.NOTION_PROJECT_DB_ID as string,
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  });
  return response;
}

export default async function Project() {
  const data = await getData();

  return (
    <div className="w-full min-h-full pt-10 pb-10">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
        {data.results.map((el: any) => (
          <Link href={`/page/${el.id}`} key={el.id}>
            <div className="aspect-[1/1.3] rounded-lg overflow-hidden shadow-lg flex flex-col cursor-pointer hover:scale-105 transition-transform">
              <div className="w-full min-h-[40%] h-[40%] bg-gray-800 dark:bg-gray-200">
                {el?.cover?.[el?.cover?.type]?.url && (
                  <img
                    className="w-full h-full object-contain object-cover"
                    src={el?.cover?.[el?.cover?.type]?.url}
                    alt={`${el?.properties?.이름?.title[0]?.plain_text} 커버사진`}
                  />
                )}
              </div>
              <div className="bg-white dark:bg-gray-700 p-3 h-full flex flex-col gap-2">
                <h3 className="text-lg font-semibold">
                  {el.properties?.이름?.title[0]?.plain_text}
                </h3>
                <p className="text-gray-500 dark:text-gray-300">
                  {el?.properties["Text"]?.rich_text[0]?.text?.content}
                </p>
                <span className="text-xs text-gray-400">
                  {el?.created_time?.substring(0, 10)}
                </span>
                <div className="flex gap-2 flex-wrap">
                  <MultiSelectList
                    multiSelect={el?.properties["Multi-select"]}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

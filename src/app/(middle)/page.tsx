import React from "react";
import { Client } from "@notionhq/client";
import Board from "@/components/board";
import Link from "next/link";
import { MultiSelectList } from "@/components/notionBlock";
import Info from "./resume/info";
import { formatDate } from "@/libs/notionUtils";
import { HiPencil } from "react-icons/hi";
import WriteBoard from "@/components/writeBoard";

async function getProjects() {
  const notion = new Client({ auth: process.env.NOTION_SECRET });
  const response = await notion.databases.query({
    database_id: process.env.NOTION_PROJECT_DB_ID as string,
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
    page_size: 3,
  });
  return response;
}

async function getWrite(category: string) {
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
    filter: { property: "category", multi_select: { contains: category } },
  });
  return response;
}

export default async function page() {
  const projectsData = await getProjects();
  const writesData = await getWrite("all");
  const [projects, writes] = await Promise.all([projectsData, writesData]);
  return (
    <div className="w-full max-w-[1000px] mx-auto space-y-6">
      <Info />
      <Board>
        <Link href="/project">
          <h2 className="mb-4 text-2xl font-semibold">새 프로젝트</h2>
        </Link>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
          {projects.results.map((el: any) => (
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
                <div className="bg-white dark:bg-[#1e1e1e] p-3 h-full flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">
                    {el.properties?.이름?.title[0]?.plain_text}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-300">
                    {el?.properties["Text"]?.rich_text[0]?.text?.content}
                  </p>
                  <span className="text-xs text-gray-400 dark:text-[rgba(255,255,255,0.6)]">
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
      </Board>
      <Board>
        <Link href="/write/all">
          <h2 className="mb-4 text-2xl font-semibold">새 글</h2>
        </Link>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
          {writes.results.map((el: any) => (
            <WriteBoard key={el?.id} write={el} />
          ))}
        </div>
      </Board>
    </div>
  );
}

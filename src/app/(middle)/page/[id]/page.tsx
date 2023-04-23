import React, { Fragment } from "react";
import { Client } from "@notionhq/client";
import {
  NotionBlock,
  NotionCover,
  NotionProperties,
} from "@/components/notionBlock";
import { Metadata } from "next";
import NotFound from "@/app/not-found";
import { Block } from "@/types/notionType";

export async function generateStaticParams() {
  const notion = new Client({ auth: process.env.NOTION_SECRET });
  const response = await notion.databases.query({
    database_id: process.env.NOTION_WRITE_DB_ID as string,
    page_size: 100,
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  });

  return (response as any)?.results?.map((el: any) => ({
    id: el.id,
  }));
  {
  }
}

async function getBlocks(id: string) {
  try {
    const notion = new Client({ auth: process.env.NOTION_SECRET });
    const blocks = await notion.blocks.children.list({
      block_id: id,
    });

    return blocks;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getPage(id: string) {
  try {
    const notion = new Client({ auth: process.env.NOTION_SECRET });
    const page = await notion.pages.retrieve({
      page_id: id,
    });
    return page;
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const page = (await getPage(params.id)) as any;
  return {
    title:
      page?.properties?.이름?.title[0]?.text?.content ||
      page?.properties?.Name?.title[0]?.text?.content,
    description:
      page?.properties?.이름?.title[0]?.text?.content ||
      page?.properties?.Name?.title[0]?.text?.content,
  };
}

export default async function NotionPage({
  params,
}: {
  params: { id: string };
}) {
  const blocksData = getBlocks(params?.id);
  const pageData = getPage(params?.id);
  const [blocks, page] = await Promise.all([blocksData, pageData]);

  let numberedList: Block[] = [];

 

  if (!blocks || !page) return <NotFound />;
  else
    return (
      <div className="w-full min-h-full shadow-xl pb-4 bg-[#ffffff8e] dark:bg-[#1e1e1e]">
        <NotionCover cover={(page as any)?.cover} />
        <NotionProperties properties={(page as any)?.properties} />
        <div className="w-full flex flex-col max-w-[900px] mx-auto px-4">
          {blocks?.results?.map((el: any, i: any) => {
            if (el?.type === "numbered_list_item") {
              numberedList.push(el);
              if (
                !blocks?.results[i + 1] ||
                (blocks?.results[i + 1] &&
                  (blocks?.results[i + 1] as any)?.type !==
                    "numbered_list_item")
              ) {
                return (
                  <Fragment key={el?.id}>
                    {/* @ts-expect-error Async Server Component */}
                    <NotionBlock
                      block={el as Block}
                      numberedList={numberedList}
                    />
                  </Fragment>
                );
              }
            } else {
              numberedList = [];
              return (
                <Fragment key={el?.id}>
                  {/* @ts-expect-error Async Server Component */}
                  <NotionBlock block={el as Block} />
                </Fragment>
              );
            }
          })}
        </div>
      </div>
    );
}

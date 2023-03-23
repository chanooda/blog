import React, { Fragment } from "react";
import { Client } from "@notionhq/client";
import { Block, Cover, Properties, RichText } from "@/components/notionPage";

export const dynamic = "force-dynamic";

async function getData(id: string) {
  const notion = new Client({ auth: process.env.NOTION_SECRET });
  const blocks = await notion.blocks.children.list({
    block_id: id,
  });
  const page = await notion.pages.retrieve({
    page_id: id,
  });
  return { blocks, page };
}

export default async function NotionPage({
  params,
}: {
  params: { id: string };
}) {
  const { blocks, page } = await getData(params.id);

  let numberedList: Block[] = [];

  return (
    <div className="w-full">
      <Cover cover={(page as any)?.cover} />
      <Properties properties={(page as any)?.properties} />
      <div className="w-full flex flex-col">
        {blocks?.results?.map((el: any, i) => {
          if (el?.type === "numbered_list_item") {
            numberedList.push(el);
            if (
              !blocks?.results[i + 1] ||
              (blocks?.results[i + 1] &&
                (blocks?.results[i + 1] as any)?.type !== "numbered_list_item")
            ) {
              return (
                <Fragment key={el?.id}>
                  {/* @ts-expect-error Async Server Component */}
                  <Block block={el as Block} numberedList={numberedList} />
                </Fragment>
              );
            }
          } else {
            numberedList = [];
            return (
              <Fragment key={el?.id}>
                {/* @ts-expect-error Async Server Component */}
                <Block block={el as Block} />
              </Fragment>
            );
          }
        })}
      </div>
    </div>
  );
}

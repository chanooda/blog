import * as React from "react";
import { Client } from "@notionhq/client";
import { Block, Cover, Properties } from "@/components/notionPage";

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

export default async function Page({ params }: { params: { id: string } }) {
  const { blocks, page } = await getData(params.id);

  return (
    <div className="w-full">
      <Cover cover={(page as any)?.cover} />
      <Properties properties={(page as any)?.properties} />
      <div className="w-full flex flex-col">
        {blocks?.results?.map((el) => (
          <>
            {/* @ts-expect-error Async Server Component */}
            <Block key={el?.id} block={el as Block} />
          </>
        ))}
      </div>
    </div>
  );
}

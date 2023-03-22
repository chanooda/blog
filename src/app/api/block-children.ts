import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req?.query;
    if (!id) return res.status(400).json({ message: "no id" });
    const notion = new Client({ auth: process.env.NOTION_SECRET });
    const child = await notion.blocks.children.list({
      block_id: id as string,
    });
    return res.status(200).json({ child });
  }
  res.status(405).json({ message: "Not Allowed Method" });
}

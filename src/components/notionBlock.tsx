import { getColor } from "@/libs/notionUtils";
import React, { useEffect, useState } from "react";
import { Block as BlockType, RichText } from "./notionPage";

// 노션 페이지 자식 블럭
interface BlockProps {
  block: BlockType;
}
export default function Block({ block }: BlockProps) {
  //   const [child, setChild] = useState<any>();
  //   useEffect(() => {
  //     if (!block?.has_children) return;
  //     (async () => {
  //       const child = await fetch(`/api/block-children?id=${block?.id}`);
  //       setChild(child);
  //     })();
  //   }, []);
  const paragraph = block?.paragraph;
  const bulletedListItem = block?.bulleted_list_item;
  if (!block?.type) return null;
  return (
    <div className="w-full">
      {block?.type === "paragraph" && (
        <div
          className="whitespace-pre-wrap mb-2"
          style={{ ...getColor(paragraph?.color) }}
        >
          {block?.paragraph?.rich_text?.map((el, i) => (
            <RichText key={i} richText={el} />
          ))}
        </div>
      )}
      {block?.type === "bulleted_list_item" && (
        <ul
          className="whitespace-pre-wrap list-disc ml-7 mb-2"
          style={{ ...getColor(bulletedListItem?.color) }}
        >
          {block?.bulleted_list_item?.rich_text?.map((el, i) => (
            <li key={i}>
              <RichText richText={el} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

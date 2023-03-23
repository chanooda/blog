import { ColorType, notionColorCodes } from "@/libs/notionColorCode";
import {
  formatDate,
  getColor,
  getListStyle,
  getTextStyle,
} from "@/libs/notionUtils";
import { Client } from "@notionhq/client";
import React, { ComponentProps, Fragment } from "react";

type ValueOf<T> = T[keyof T];
type BlockType =
  | "paragraph"
  | "bulleted_list_item"
  | "image"
  | "column_list"
  | "divider"
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "code"
  | "numbered_list_item";
type RichTextType = "text" | "mention" | "equation";
type CoverType = "external" | "file";

export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: ColorType;
}

export interface RichText {
  type: RichTextType;
  text?: {
    content: string;
    link: {};
  };
  mention?: {
    content: string;
    link: {};
  };
  equation?: {
    expression: string;
  };
  annotations: Annotations;
  plain_text: string;
  href: string;
}

export interface Block {
  object: string;
  id: string;
  parent: {
    type: string;
    page_id: string;
  };
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: string;
    id: string;
  };
  last_edited_by: {
    object: string;
    id: string;
  };
  has_children: boolean;
  archived: boolean;
  type: BlockType;
  paragraph?: {
    rich_text: RichText[];
    color: ColorType;
  };
  numbered_list_item?: {
    rich_text: RichText[];
    color: ColorType;
  };
  bulleted_list_item?: {
    rich_text: RichText[];
    color: ColorType;
  };
  image?: {
    caption: [];
    type: CoverType;
    file: {
      url: string;
      expiry_time: string;
    };
  };
  divider?: {};
  heading_1?: { rich_text: RichText[]; color: ColorType };
  heading_2?: { rich_text: RichText[]; color: ColorType };
  heading_3?: { rich_text: RichText[]; color: ColorType };
  code?: { rich_text: RichText[]; language: string };
}

export interface Properties {
  "Created time": {
    id: string;
    type: string;
    created_time: string;
  };
  "Multi-select"?: {
    id: string;
    type: string;
    multi_select: {
      id: string;
      name: string;
      color: ColorType;
    }[];
  };
  tags?: {
    id: string;
    type: string;
    multi_select: {
      id: string;
      name: string;
      color: ColorType;
    }[];
  };
  category?: {
    id: string;
    type: string;
    multi_select: {
      id: string;
      name: string;
      color: ColorType;
    }[];
  };
  Text?: {
    id: string;
    type: string;
    rich_text: RichText[];
  };
  이름?: {
    id: string;
    type: string;
    title: RichText[];
  };
  Name?: {
    id: string;
    type: string;
    title: RichText[];
  };
}

export interface Page {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: string;
    id: string;
  };
  last_edited_by: {
    object: string;
    id: string;
  };
  cover: {
    type: string;
    file: {
      url: string;
      expiry_time: string;
    };
  };
  icon: null;
  parent: {
    type: string;
    database_id: string;
  };
  archived: false;
  properties: Properties;
}

type Cover = CoverTypeObj & CoverUrl;

type CoverTypeObj = { type: CoverType };
type CoverUrl = {
  [key in CoverType]: { url: string };
};

// 자식 블럭 가져오기
async function getData(id: string) {
  const notion = new Client({ auth: process.env.NOTION_SECRET });
  const blocks = await notion.blocks.children.list({
    block_id: id,
  });

  return blocks;
}

// 노션 페이지 자식 블럭
interface BlockProps {
  block: Block;
  step?: number;
  parentType?: BlockType;
  numberedList?: Block[];
}
export const Block = async ({
  parentType,
  block,
  step = 1,
  numberedList,
}: BlockProps) => {
  const child = block?.has_children && ((await getData(block?.id)) as any);
  console.log(parentType);
  if (!block?.type) return null;
  if (
    (block?.type === "bulleted_list_item" &&
      parentType !== "bulleted_list_item") ||
    (block?.type === "numbered_list_item" &&
      parentType !== "numbered_list_item")
  )
    step = 1;
  let childNumberedList: Block[] = [];
  console.log(step);
  if (
    (!numberedList || numberedList.length === 0) &&
    block?.type === "numbered_list_item"
  ) {
    return (
      <li key={block?.id} className={`w-full`}>
        {block?.numbered_list_item?.rich_text?.map((el, i) => (
          <RichText key={i} richText={el} />
        ))}
        {child &&
          child?.results?.map((el: any, i: number) => {
            if (el?.type === "numbered_list_item") {
              childNumberedList.push(el);
              if (
                !child?.results[i + 1] ||
                (child?.results[i + 1] &&
                  (child?.results[i + 1] as any)?.type !== "numbered_list_item")
              ) {
                return (
                  <Fragment key={el?.id}>
                    {/* @ts-expect-error Async Server Component */}
                    <Block
                      parentType={block?.type}
                      step={step + 1}
                      block={el}
                      numberedList={childNumberedList}
                    />
                  </Fragment>
                );
              }
            } else
              return (
                <Fragment key={el?.id}>
                  {/* @ts-expect-error Async Server Component */}
                  <Block parentType={block?.type} step={step + 1} block={el} />
                </Fragment>
              );
          })}
      </li>
    );
  } else {
    return (
      <>
        <div
          className={`flex items-start min-w-0 mb-2 ${
            block?.type === "column_list"
              ? "flex-row justify-start gap-2"
              : "flex-col"
          }`}
          style={{
            paddingLeft: step > 1 ? "25px" : "0px",
          }}
        >
          {block?.type === "heading_1" && (
            <div
              className="w-full"
              style={{ ...getColor(block?.heading_1?.color) }}
            >
              <h1 className="text-3xl font-semibold">
                {block?.heading_1?.rich_text?.map((el, i) => (
                  <RichText key={i} richText={el} />
                ))}
              </h1>
            </div>
          )}
          {block?.type === "heading_2" && (
            <div
              className="w-full"
              style={{ ...getColor(block?.heading_2?.color) }}
            >
              <h1 className="text-2xl font-semibold">
                {block?.heading_2?.rich_text?.map((el, i) => (
                  <RichText key={i} richText={el} />
                ))}
              </h1>
            </div>
          )}
          {block?.type === "heading_3" && (
            <div
              className="w-full"
              style={{ ...getColor(block?.heading_3?.color) }}
            >
              <h1 className="text-xl font-semibold">
                {block?.heading_3?.rich_text?.map((el, i) => (
                  <RichText key={i} richText={el} />
                ))}
              </h1>
            </div>
          )}
          {block?.type === "image" && (
            <div
              className={`${
                parentType === "column_list" ? "max-w-[200px]" : ""
              }`}
            >
              <img className="w-full" src={block?.image?.file?.url} />
            </div>
          )}
          {block?.type === "paragraph" && (
            <div
              className="w-full"
              style={{ ...getColor(block?.paragraph?.color) }}
            >
              {block?.paragraph?.rich_text?.map((el, i) => (
                <RichText key={i} richText={el} />
              ))}
            </div>
          )}
          {/* 숫자 리스트 */}
          {numberedList && numberedList?.length > 0 && (
            <ul
              className="whitespace-pre-wrap ml-5 space-y-2"
              style={{
                ...getColor(block?.numbered_list_item?.color),
                ...getListStyle("number", step),
              }}
            >
              {numberedList?.map((el) => (
                <Fragment key={el?.id}>
                  {/* @ts-expect-error Async Server Component */}
                  <Block parentType={el?.type} block={el} step={step + 1} />
                </Fragment>
              ))}
            </ul>
          )}
          {block?.type === "bulleted_list_item" && (
            <ul
              className="whitespace-pre-wrap ml-5 space-y-2"
              style={{
                ...getColor(block?.bulleted_list_item?.color),
                ...getListStyle("bullet", step),
              }}
            >
              <li className={`w-full`}>
                {block?.bulleted_list_item?.rich_text?.map((el, i) => (
                  <RichText key={i} richText={el} />
                ))}
              </li>
            </ul>
          )}
          {block?.type === "divider" && (
            <div className="w-full h-[0.5px] bg-gray-200 my-2" />
          )}
          {block?.type === "code" &&
            block?.code?.rich_text?.map((el, i) => (
              <div
                className="w-full p-4 rounded-lg bg-[rgb(247,_246,_243)] dark:bg-gray-700"
                key={i}
              >
                <pre className="w-full overflow-y-auto">
                  <code className="w-full block">{el?.text?.content}</code>
                </pre>
              </div>
            ))}
          {block?.type !== "numbered_list_item" &&
            child &&
            child?.results.map((el: Block, i: number) => (
              <Fragment key={el?.id}>
                {/* @ts-expect-error Async Server Component */}
                <Block parentType={block?.type} step={step + 1} block={el} />
              </Fragment>
            ))}
        </div>
      </>
    );
  }
};

// 노션 block 내의 구성 텍스트
interface RichTextProps {
  richText: RichText;
}
export const RichText = ({ richText }: RichTextProps) => {
  if (!richText?.type) return null;
  if (richText?.type && richText?.href) {
    return (
      <a
        target="_blank"
        rel="noreferrer noopener"
        className="whitespace-pre-wrap text-gray-500 underline"
        href={
          richText?.href && richText?.href[0] === "/"
            ? `/page${richText?.href}`
            : richText?.href
        }
        style={{
          wordBreak: "break-word",
        }}
      >
        {richText?.plain_text}
      </a>
    );
  } else if (richText?.type === "text") {
    return (
      <span
        className="whitespace-pre-wrap"
        style={{
          wordBreak: "break-word",
          ...getTextStyle(richText?.annotations),
        }}
      >
        {richText?.[richText?.type]?.content}
      </span>
    );
  } else if (richText?.type === "equation") {
    return (
      <span
        className="whitespace-pre-wrap italic"
        style={{
          wordBreak: "break-word",
          ...getTextStyle(richText?.annotations),
        }}
      >
        {richText?.equation?.expression}
      </span>
    );
  } else return null;
};

// 노션 페이지 속성
interface PropertiesProps {
  properties: Properties;
}
export const Properties = ({ properties }: PropertiesProps) => {
  return (
    <div className="mb-20 space-y-2 w-full mt-8">
      <h1 className="text-4xl">
        {properties?.이름?.title[0]?.text?.content ||
          properties?.Name?.title[0]?.text?.content}
      </h1>
      <p className="text-left">
        {formatDate(properties["Created time"]?.created_time)}
      </p>
      {properties?.["tags"] && (
        <MultiSelectList direction="left" multiSelect={properties?.["tags"]} />
      )}
      {properties?.["Multi-select"] && (
        <MultiSelectList
          direction="left"
          multiSelect={properties?.["Multi-select"]}
        />
      )}
    </div>
  );
};

// 노션 페이지 속성 mulit select 리스트
interface MultiSelectList {
  multiSelect: Properties["Multi-select"];
  direction?: "left" | "right";
  colum?: boolean;
}
export const MultiSelectList = ({
  multiSelect,
  direction = "left",
  colum = false,
}: MultiSelectList) => {
  return (
    <div
      className={`w-full flex gap-2 flex-wrap ${
        colum ? "flex-col" : "flex-row"
      }`}
      style={{ justifyContent: direction }}
    >
      {multiSelect?.multi_select?.map((el: any) => (
        <MultiSelectListCard key={el?.id} content={el} />
      ))}
    </div>
  );
};

interface MultiSelectListCardProps extends ComponentProps<"div"> {
  size?: "md" | "lg";
  content: any;
}

export const MultiSelectListCard = ({
  size = "md",
  content,
  className,
}: MultiSelectListCardProps) => {
  return (
    <div
      style={{
        backgroundColor:
          content.color !== "default"
            ? (notionColorCodes as any)[`${content.color}_background`]
            : "rgba(227, 226, 224, 0.5)",
        color:
          content.color !== "default"
            ? (notionColorCodes as any)[content.color]
            : "rgb(50, 48, 44)",
      }}
      className={`rounded-md  ${
        size === "md" ? "px-2 py-1" : "px-2 py-3"
      } ${className}`}
    >
      <span className="text-xs block">{content.name}</span>
    </div>
  );
};

// 노션 페이지 상단 커버
interface CoverProps {
  cover: Cover;
}
export const Cover = ({ cover }: CoverProps) => {
  if (!cover) return null;
  else
    return (
      <div className="w-full h-[250px]">
        <img
          className="w-full h-full object-cover"
          src={cover[cover?.type]?.url}
          alt="커버사진"
        />
      </div>
    );
};

import Link from "next/link";
import React from "react";
import { HiPencil } from "react-icons/hi";
import { MultiSelectList } from "./notionBlock";
import { Properties } from "@/types/notionType";
import { formatDate } from "@/libs/notionUtils";
import { CoverType } from "@/types/notionType";

interface WriteProps {
  properties: {
    image: {
      files: {
        type: CoverType;
        file: {
          url: string;
          expiry_time: string;
        };
        external: {
          url: string;
          expiry_time: string;
        };
      }[];
    };
    Name: {
      title: {
        text: {
          content: string;
        };
      }[];
    };
    Text: {
      rich_text: {
        text: {
          content: string;
        };
      }[];
    };
    tags: Properties["Multi-select"];
  };
  id: string;
  created_time: string;
}

interface WriteBoardProps {
  write: WriteProps;
}

export default function WriteBoard({ write }: WriteBoardProps) {
  return (
    <Link key={write?.id} href={`/page/${write?.id}`}>
      <div className="w-full flex flex-col gap-4 cursor-pointer border border-gray-300 rounded-md">
        {write?.properties?.image?.files[0] ? (
          <div className="w-full rounded-t-md shadow-md aspect-[1.5/0.8] overflow-hidden relative">
            <img
              className="object-cover w-full h-full"
              src={
                write?.properties?.image?.files[0]?.[
                  write?.properties?.image?.files[0]?.type
                ]?.url
              }
              alt="대표 이미지"
            />
          </div>
        ) : (
          <div className="w-full aspect-[1.5/0.8] overflow-hidden bg-slate-100 flex items-center dark:bg-slate-600 justify-center shadow-md  rounded-t-md">
            <HiPencil className="text-gray-400 text-5xl" />
          </div>
        )}
        <div className="w-full flex flex-col gap-2 min-w-0 flex-1 p-2">
          <div className="w-full min-w-0">
            <h2 className="w-full font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
              {write?.properties?.Name?.title[0]?.text?.content}
            </h2>
            <div>
              <p
                style={
                  {
                    wordBreak: "break-word",
                    display: "-webkit-box",
                    "-webkit-box-orient": "vertical",
                    "-webkit-line-clamp": "3",
                  } as any
                }
                className="text-gray-600 mt-2 text-sm w-full h-16 text-ellipsis break-words overflow-hidden"
              >
                {write?.properties["Text"]?.rich_text[0]?.text?.content}
              </p>
            </div>
            <span className="text-xs text-gray-500">
              {formatDate(write?.created_time)}
            </span>
          </div>
          <MultiSelectList multiSelect={write?.properties?.tags} />
        </div>
      </div>
    </Link>
  );
}

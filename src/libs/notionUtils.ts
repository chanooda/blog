import { Annotations } from "@/components/notionPage";
import { CSSProperties } from "react";
import { ColorType, notionColorCodes } from "./notionColorCode";

type GetColor = (colorCode?: ColorType) => CSSProperties | null;
export const getColor: GetColor = (colorCode) => {
  if (colorCode) {
    return {
      color: notionColorCodes[colorCode],
    };
  }
  return null;
};

type GetTextStyle = (annotations?: Annotations) => CSSProperties | null;
export const getTextStyle: GetTextStyle = (annotations) => {
  return {
    ...(annotations?.bold && { fontWeight: 600 }),
    ...(annotations?.italic && { fontStyle: "italic" }),
    ...(annotations?.strikethrough && { textDecoration: "line-through" }),
    ...(annotations?.underline && { textDecoration: "underline" }),
    ...(annotations?.color && getColor(annotations?.color)),
    ...(annotations?.code && {
      borderRadius: "3px",
      background: "rgba(135,131,120,0.15)",
      padding: "0px 4px",
    }),
  };
};

export const formatDate = (date: string) => {
  return date?.substring(0, 10);
};

type GetListStyle = (step: number) => CSSProperties | null;
export const getListStyle: GetListStyle = (step) => {
  if (step % 3 === 0) return { listStyle: "square" };
  if (step % 3 === 2) return { listStyle: "circle" };
  if (step % 3 === 1) return { listStyle: "initial" };
  return null;
};

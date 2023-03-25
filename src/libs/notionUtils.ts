import { Annotations, ColorType } from "@/types/notionType";
import { CSSProperties } from "react";
import { notionColorCodes } from "./notionColorCode";

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

type GetListStyle = (
  type: "number" | "bullet",
  step: number
) => CSSProperties | null;
export const getListStyle: GetListStyle = (type, step) => {
  if (type === "bullet") {
    if (step % 3 === 0) return { listStyle: "square" };
    if (step % 3 === 2) return { listStyle: "circle" };
    if (step % 3 === 1) return { listStyle: "initial" };
  }
  if (type === "number") {
    if (step % 3 === 0) return { listStyle: "lower-roman" };
    if (step % 3 === 2) return { listStyle: "lower-alpha" };
    if (step % 3 === 1) return { listStyle: "decimal" };
  }
  return null;
};

import { CSSProperties } from "react";

export type ColorType =
  | "gray_background"
  | "brown_background"
  | "orange_background"
  | "yellow_background"
  | "green_background"
  | "blue_background"
  | "purple_background"
  | "pink_background"
  | "red_background"
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red";

type NotionColorCodes = {
  [key in ColorType]: CSSProperties["color"];
};

export const notionColorCodes: NotionColorCodes = {
  gray_background: "#F1F1EF",
  brown_background: "#F3EEEE",
  orange_background: "#F8ECDF",
  yellow_background: "#FAF3DD",
  green_background: "#EEF3ED",
  blue_background: "#E9F3F7",
  purple_background: "#F6F3F8",
  pink_background: "#F9F2F5",
  red_background: "#FAECEC",
  gray: "#787774 ",
  brown: "#976D57",
  orange: "#CC772F",
  yellow: "#C29243",
  green: "#548064",
  blue: "#477DA5",
  purple: "#A48BBE",
  pink: "#B35588",
  red: "#C4554D",
};

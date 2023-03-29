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

export type NotionColorCodes = {
  [key in ColorType]: CSSProperties["color"];
};

export type BlockType =
  | "paragraph"
  | "bulleted_list_item"
  | "image"
  | "column_list"
  | "divider"
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "code"
  | "numbered_list_item"
  | "embed";
export type RichTextType = "text" | "mention" | "equation";
export type CoverType = "external" | "file";

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
  embed?: { url: string };
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

export type Cover = CoverTypeObj & CoverUrl;

export type CoverTypeObj = { type: CoverType };
export type CoverUrl = {
  [key in CoverType]: { url: string };
};

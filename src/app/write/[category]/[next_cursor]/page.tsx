import React from "react";
import Write from "../page";

export default async function Page({
  params,
}: {
  params: { category: string; next_cursor: string };
}) {
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <Write params={params} />;
    </>
  );
}

import React from "react";
import Write from "../page";

export const dynamic = "force-static";
export const revalidate = 1800;

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

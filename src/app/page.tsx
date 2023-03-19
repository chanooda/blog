import Client from "@notionhq/client/build/src/Client";

async function getData() {
  const notion = new Client({ auth: process.env.NOTION_SECRET });
  const response = await notion.databases.query({
    database_id: process.env.NOTION_PROJECT_DB_ID as string,
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  });
  return response;
}

export default async function Home() {
  const data = await getData();
  console.log(data.results);

  return (
    <div className="w-full">
      <div className="w-full flex">
        {data.results.map((el) => (
          <div key={el.id}>{el?.object}</div>
        ))}
      </div>
    </div>
  );
}

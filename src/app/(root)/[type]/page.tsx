import { Client } from "./client";

export default async function Page({
  params,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const type = (await params)?.type || "";

  return <Client type={type} />;
}

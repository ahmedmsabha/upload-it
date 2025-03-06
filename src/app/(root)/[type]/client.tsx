"use client";

import FileCard from "@/components/root/file-card";
import Sort from "@/components/root/sort";
import { sortTypes } from "@/constants";
import { getTotalSpaceUsed, getFiles } from "@/lib/actions/file.action";
import {
  convertFileSize,
  getFileTypesParams,
  getUsageSummary,
} from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Models } from "node-appwrite";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

export function Client({ type }: { type: string }) {
  const searchParams = useSearchParams();
  const effectiveSort = searchParams.get("sort") || sortTypes[0].value;
  const searchText = searchParams.get("query") || "";

  // const [sort, setSort] = useQueryState("sort");

  const types = getFileTypesParams(type) as FileType[];

  const { data, isLoading } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["files", type, searchText, effectiveSort],
    queryFn: async () => {
      const [files, totalSpace] = await Promise.all([
        getFiles({
          types,
          searchText,
          sort: effectiveSort,
        }),
        getTotalSpaceUsed(),
      ]);
      return { files, totalSpace };
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  const usedSummary = getUsageSummary(data?.totalSpace);
  const totalSize = usedSummary.find(
    (item) => item.title === type.charAt(0).toUpperCase() + type.slice(1)
  )?.size;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8">
      <section className="w-full">
        <h1 className="text-4xl font-bold capitalize leading-[42px]">{type}</h1>

        <div className="mt-2 flex flex-col justify-between sm:flex-row sm:items-center">
          <p className="text-base font-normal leading-6">
            Total size:{" "}
            <span className="text-base font-semibold leading-6">
              {convertFileSize(totalSize)}
            </span>
          </p>

          <div className="mt-5 flex items-center sm:mt-0 sm:gap-3">
            <p className="hidden text-base font-normal leading-6 text-light-200 sm:block">
              Sort by:
            </p>
            <Sort />
          </div>
        </div>
      </section>

      {data?.files.total > 0 ? (
        <section className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.files.documents.map((file: Models.Document) => (
            <FileCard key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="mt-10 text-center text-base font-normal leading-6 text-light-200">
          No files uploaded yet
        </p>
      )}
    </div>
  );
}

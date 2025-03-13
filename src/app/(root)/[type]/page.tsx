"use client";
import FileCard from "@/components/root/file-card";
import { getTotalSpaceUsed, getFiles } from "@/lib/actions/file.action";
import { convertFileSize, fileTypeConfig, getUsageSummary } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Models } from "node-appwrite";
import { Loader2 } from "lucide-react";
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { sortTypes } from "@/constants";
import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";

const sortIds = sortTypes.map((sort) => sort.value);

export function TypePageContent({ type }: { type: string }) {
  const [searchText] = useQueryState(
    "query",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true })
  );

  const [sort, setSort] = useQueryState(
    "sort",
    parseAsStringLiteral(sortIds).withDefault(sortIds[0])
  );

  // const types = getFileTypesParams(type) as FileType[];

  const { error, data, isLoading } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["files", type, searchText, sort],
    queryFn: async () => {
      const [files, totalSpace] = await Promise.all([
        getFiles({
          types: fileTypeConfig[type],
          searchText,
          sort,
        }),
        getTotalSpaceUsed(),
      ]);

      return { files, totalSpace };
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Error...</p>
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

            <SortSelect value={sort} onValueChange={setSort} />
          </div>
        </div>
      </section>

      {data && data.files.total > 0 ? (
        <section className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.files.documents.map((file: Models.Document) => (
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

function SortSelect({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className="h-11 w-full rounded-[8px] border-transparent bg-white !shadow-sm outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 sm:w-[210px]">
        <SelectValue placeholder={sortIds} />
      </SelectTrigger>
      <SelectContent className="!shadow-drop-3">
        {sortTypes.map((sort) => (
          <SelectItem
            key={sort.value}
            className="cursor-pointer"
            value={sort.value}
          >
            {sort.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default async function TypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  return <TypePageContent type={type} />;
}

import React from "react";
import { Models } from "node-appwrite";
import Link from "next/link";
import { Thumbnail } from "./thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "./formatted-date-time";
import { ActionDropdown } from "./action-dropdown";

interface FileCardProps {
  file: Models.Document;
}

export default function FileCard({ file }: FileCardProps) {
  return (
    <Link
      href={file.url}
      target="_blank"
      className="flex cursor-pointer flex-col gap-6 rounded-[18px] bg-white p-5 shadow-sm transition-all hover:shadow-drop-3"
    >
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          url={file.url}
          extension={file.extention}
          className="!size-20"
          imageClassName="!size-11"
        />
        <div className="flex flex-col items-end justify-between">
          <ActionDropdown file={file} />
          <p className="text-base font-medium leading-6">
            {convertFileSize(file.size)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-light-100">
        <p className="line-clamp-1 text-base font-medium leading-6">
          {file.name}
        </p>
        <FormattedDateTime
          date={file.$createdAt}
          className="text-sm font-normal leading-5 text-light-100"
        />
        <p className="line-clamp-1 text-xs font-normal leading-4 text-light-200">
          By: {file.owner.fullName}
        </p>
      </div>
    </Link>
  );
}

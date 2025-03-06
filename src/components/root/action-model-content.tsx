import type { Models } from "node-appwrite";
import { Thumbnail } from "./thumbnail";
import FormattedDateTime from "./formatted-date-time";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
const ImageThumbnail = ({ file }: { file: Models.Document }) => (
  <div className="!mb-1 flex items-center gap-3 rounded-xl border border-light-200/40 bg-light-400/50 p-3">
    <Thumbnail extension={file.extention} type={file.type} url={file.url} />
    <div className="flex flex-col">
      <p className="mb-1 text-sm font-semibold leading-5">{file.name}</p>
      <FormattedDateTime
        date={file.$createdAt}
        className="text-xs font-normal leading-4"
      />
    </div>
  </div>
);

const DetailsRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex">
    <p className="body-2 w-[30%] text-left text-light-100">{label}</p>
    <p className="flex-1 text-left text-sm font-semibold leading-5">{value}</p>
  </div>
);

export function FileDetails({ file }: { file: Models.Document }) {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="space-y-4 px-2 pt-2">
        <DetailsRow label="Format:" value={file.extention} />
        <DetailsRow label="Size:" value={convertFileSize(file.size)} />
        <DetailsRow label="Owner:" value={file.owner.fullName} />
        <DetailsRow
          label="Last Modified:"
          value={formatDateTime(file.$updatedAt)}
        />
      </div>
    </>
  );
}

interface ShareInputProps {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}
export function ShareInput({ file, onInputChange, onRemove }: ShareInputProps) {
  return (
    <>
      <ImageThumbnail file={file} />

      <div className="!mt-2 space-y-2">
        <p className="pl-1 text-sm font-semibold leading-5 text-light-100">
          Share file with other users
        </p>
        <Input
          className="body-2 shad-no-focus h-[52px] w-full rounded-full border px-4 shadow-drop-1"
          type="email"
          placeholder="Enter your email address"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
        />
        <div className="pt-4">
          <div className="flex justify-between">
            <p className="text-sm font-semibold leading-5 text-light-100">
              Shared with
            </p>
            <p className="text-sm font-semibold leading-5 text-light-100">
              {file.users.length} {file.users.length === 1 ? "user" : "users"}
            </p>
          </div>

          <ul className="pt-2">
            {file.users.map((email: string) => (
              <li
                key={email}
                className="flex items-center justify-between gap-2"
              >
                <p className="text-sm font-semibold leading-5">{email}</p>
                <Button
                  onClick={() => onRemove(email)}
                  className="rounded-full bg-transparent text-light-100 shadow-none hover:bg-transparent"
                >
                  <Image
                    src="/icons/remove.svg"
                    alt="remove"
                    width={24}
                    height={24}
                    className="aspect-square rounded-full"
                  />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

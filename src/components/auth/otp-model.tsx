"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { verifySecret, sendEmailOTP } from "@/lib/actions/users.action";

export function OtpModel({
  email,
  accountId,
}: {
  email: string;
  accountId: string;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const sessionId = await verifySecret({ accountId, password });
      if (sessionId) {
        router.push(`/`);
      }
    } catch (error) {
      console.error("Failed to verify OTP", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendOTP() {
    await sendEmailOTP({ email });
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="text-center text-2xl font-bold leading-9">
            Enter the your OTP
            <Image
              src="./icons/close-dark.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => setIsOpen(false)}
              className="absolute -right-1 -top-7 cursor-pointer sm:-right-2 sm:-top-4"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base font-semibold leading-5 text-light-100">
            We have sent a code to{" "}
            <span className="pl-1 text-brand">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="flex w-full justify-between gap-1 sm:gap-2">
            <InputOTPSlot
              index={0}
              className="flex size-12 justify-center gap-5 rounded-xl border-2 border-light-300 text-[40px] font-medium text-brand-100 shadow-drop-1 ring-brand md:size-16"
            />
            <InputOTPSlot
              index={1}
              className="flex size-12 justify-center gap-5 rounded-xl border-2 border-light-300 text-[40px] font-medium text-brand-100 shadow-drop-1 ring-brand md:size-16"
            />
            <InputOTPSlot
              index={2}
              className="flex size-12 justify-center gap-5 rounded-xl border-2 border-light-300 text-[40px] font-medium text-brand-100 shadow-drop-1 ring-brand md:size-16"
            />

            <InputOTPSlot
              index={3}
              className="flex size-12 justify-center gap-5 rounded-xl border-2 border-light-300 text-[40px] font-medium text-brand-100 shadow-drop-1 ring-brand md:size-16"
            />
            <InputOTPSlot
              index={4}
              className="flex size-12 justify-center gap-5 rounded-xl border-2 border-light-300 text-[40px] font-medium text-brand-100 shadow-drop-1 ring-brand md:size-16"
            />
            <InputOTPSlot
              index={5}
              className="flex size-12 justify-center gap-5 rounded-xl border-2 border-light-300 text-[40px] font-medium text-brand-100 shadow-drop-1 ring-brand md:size-16"
            />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className="flex w-full flex-col gap-4">
            <AlertDialogAction
              className="button h-12 rounded-full bg-brand transition-all hover:bg-brand-100"
              onClick={handleSubmit}
              type="button"
            >
              Continue
              {isLoading && (
                <Image
                  src="./icons/loader.svg"
                  alt="loader"
                  width={20}
                  height={20}
                  className="ml-2 animate-spin"
                />
              )}
            </AlertDialogAction>
            <div className="mt-2 text-center text-base font-semibold leading-5 text-light-100">
              Didn&apos;t receive the code?
              <Button
                type="button"
                variant="link"
                className="pl-1 text-brand"
                onClick={handleResendOTP}
              >
                Click here to resend
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

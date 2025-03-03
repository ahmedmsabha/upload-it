"use server";

import { createAdminClient, createSessionClient } from "../appwrite";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { appwriteConfig } from "../appwrite/config";
import { cookies } from "next/headers";
import { avatarPlaceholderUrl } from "@/constants";
import { redirect } from "next/navigation";
async function getUserByEmail(email: string) {
  const { databases } = createAdminClient();

  const results = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", [email])]
  );

  return results.total > 0 ? results.documents[0] : null;
}

function handleError(error: unknown, message: string) {
  console.error(error, message);
  throw error;
}

export async function sendEmailOTP({ email }: { email: string }) {
  const { account } = createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);

    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
}

export async function createAccount({
  email,
  fullName,
}: {
  email: string;
  fullName: string;
}) {
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const accountId = await sendEmailOTP({ email });
  if (!accountId) throw new Error("Failed to send email OTP");

  if (!existingUser) {
    const { databases } = createAdminClient();

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        email,
        fullName,
        avatar: avatarPlaceholderUrl,
        accountId,
      }
    );
  }
  return parseStringify({ accountId });
}

export async function verifySecret({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) {
  try {
    const { account } = createAdminClient();
    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify secret");
  }
}

export async function getCurrentUser() {
  const { databases, account } = await createSessionClient();

  const session = await account.get();

  const user = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("accountId", [session.$id])]
  );

  if (user.total <= 0) return null;

  return parseStringify(user.documents[0]);
}

export async function signOutUser() {
  const { account } = await createSessionClient();

  try {
    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
  } catch (error) {
    handleError(error, "Failed to sign out user");
  } finally {
    redirect("/sign-in");
  }
}

export async function signInUser({ email }: { email: string }) {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return parseStringify({ accountId: existingUser.accountId });
    }

    return parseStringify({ accountId: null, error: "User not found" });
  } catch (error) {
    handleError(error, "Failed to sign in user");
  }
}

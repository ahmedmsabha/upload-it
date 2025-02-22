"use server";

import { createAdminClient } from "../appwrite";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { appwriteConfig } from "../appwrite/config";

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

async function sendEmailOTP({ email }: { email: string }) {
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
        avatar:
          "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
        accountId,
      }
    );
  }
  return parseStringify({ accountId });
}

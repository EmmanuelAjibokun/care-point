/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";


import { ID, Query } from "node-appwrite"
import { databases, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils";

import { InputFile } from "node-appwrite/file"

console.log("user")
// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  // console.log("createUser function called with user:", user);
  // console.log("endpoint: ", process.env.NEXT_PUBLIC_ENDPOINT);
  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    return parseStringify(newUser)
  } catch (error: any) {
    if(error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email])
      ])

      return existingUser?.users[0];
    }
    console.error("An error occurred while creating a new user", error)
  }
} 

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId)

    return parseStringify(user)
  } catch (error) {
    console.log(error)
  }
}

export const registerPatient = async ({ identificationDocument, ...patient }: RegisterUserParams) => {
  try {
    let file;

    // store a file in appwrite storage by creating a blob file
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      )

      file = await storage.createFile(process.env.NEXT_PUBLIC_BUCKET_ID!, ID.unique(), inputFile)
    }

    const newPatient = await databases.createDocument(
      process.env.DATABASE_ID!,
      process.env.PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: file?.$id
          ? `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${file.$id}/view??project=${process.env.PROJECT_ID}`
          : null,
        ...patient,
      }
    )

    return parseStringify(newPatient)
  } catch (error) {
    console.log(error)
  }
}
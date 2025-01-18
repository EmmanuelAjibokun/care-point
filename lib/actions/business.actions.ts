/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";


import { ID, Query } from "node-appwrite"
import { databases, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils";

import { InputFile } from "node-appwrite/file"

console.log("user")
// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
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
    console.log("created new user")
    return parseStringify(newUser)
  } catch (error: any) {
    if(error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email])
      ])
      console.log("existing user")
      return [existingUser?.users[0], true];
    }
    console.error("An error occurred while creating a new user", error)
  }
}
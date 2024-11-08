/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";


import { ID, Query } from "node-appwrite"
import { users } from "../appwrite.config"
import { parseStringify } from "../utils";

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
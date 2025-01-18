/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";


import { ID } from "node-appwrite"
import { databases } from "../appwrite.config"
import { parseStringify } from "../utils";

console.log("user")
// CREATE APPWRITE COLLECTION OF DOCTORS
export const registerDoctor = async ({ ...doctor }: CreateDoctorParams) => {
  try {
    const newDoctor = await databases.createDocument(
      process.env.DATABASE_ID!,
      process.env.DOCTOR_COLLECTION_ID!,
      ID.unique(),
      {...doctor}
    )

    console.log("created new doctor")
    return parseStringify(newDoctor)
  } catch (error) {
    console.log(error)
  }
}
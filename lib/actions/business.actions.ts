/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";


import { ID } from "node-appwrite"
import { databases } from "../appwrite.config"
import { parseStringify } from "../utils";

console.log("user")
// CREATE APPWRITE COLLECTION OF DOCTORS
export const registerDoctor = async ({ ...doctor }: CreateDoctorParams) => {
  try {
    await databases.createDocument(
      process.env.DATABASE_ID!,
      process.env.DOCTOR_COLLECTION_ID!,
      ID.unique(),
      {...doctor}
    )

    const doctors = await getDoctors()
    return doctors
  } catch (error) {
    console.log(error)
  }
}

export const getDoctors = async () => {
  try {
    const doctors = await databases.listDocuments(
      process.env.DATABASE_ID!,
      process.env.DOCTOR_COLLECTION_ID!,
    )
    if (doctors) {
      return parseStringify(doctors.documents)
    }
  } catch (error) {
    console.log(error)
  }
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";


import { ID } from "node-appwrite"
import { databases, storage } from "../appwrite.config"
import { parseStringify } from "../utils";

import { InputFile } from "node-appwrite/file"

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

export const registerBusiness = async ({hospitalLogo, licenseDocument, ...business }: CreateBusinessParams) => {
  try {
    let logo, license;

    // store a file in appwrite storage by creating a blob file
    if (hospitalLogo) {
      const inputFile = InputFile.fromBuffer(
        hospitalLogo?.get("blobFile") as Blob,
        hospitalLogo?.get("fileName") as string
      )

      logo = await storage.createFile(process.env.NEXT_PUBLIC_BUCKET_ID!, ID.unique(), inputFile)
    }

    if (licenseDocument) {
      const inputFile = InputFile.fromBuffer(
        licenseDocument?.get("blobFile") as Blob,
        licenseDocument?.get("fileName") as string
      )

      license = await storage.createFile(process.env.NEXT_PUBLIC_BUCKET_ID!, ID.unique(), inputFile)
    }

    const newBusiness = await databases.createDocument(
      process.env.DATABASE_ID!,
      process.env.BUSINESS_COLLECTION_ID!,
      ID.unique(),
      {
        hospitalLogoId: logo?.$id || null,
        hospitalLogoUrl: logo?.$id
          ? `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${logo.$id}/view??project=${process.env.PROJECT_ID}`
          : null,
        licenseDocumentId: license?.$id || null,
        licenseDocumentUrl: license?.$id
          ? `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${license.$id}/view??project=${process.env.PROJECT_ID}`
          : null,
        ...business,
      }
    )
    return parseStringify(newBusiness)

  } catch (error) {
    console.log(error)
  }
}
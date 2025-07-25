"use server";


import { ID, Query } from "node-appwrite";
import { databases, messaging } from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";

import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

console.log("user")
// CREATE APPWRITE USER
export const createAppointment = async (appointment: CreateAppointmentParams) => {

  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newAppointment = await databases.createDocument(
      process.env.DATABASE_ID!,
      process.env.APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );
    revalidatePath("/admin")
    return parseStringify(newAppointment)
  } catch (error) {
    console.error("An error occurred while creating a new appointment: ", error)
  }
} 

// Get appointment
export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      process.env.DATABASE_ID!,
      process.env.APPOINTMENT_COLLECTION_ID!,
      appointmentId
    )

    return parseStringify(appointment)
  } catch (error) {
    console.log("An error occurred while retrieving the existin patient", error)
  }
}

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
} : UpdateAppointmentParams) => {
  try {
    // Update appointment to scheduled -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#updateDocument
    const updatedAppointment = await databases.updateDocument(
      process.env.DATABASE_ID!,
      process.env.APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    )

    if (!updatedAppointment) throw Error;

    const smsMessage = `Greetings from CarePulse. ${type === "schedule" ? `Your appointment is confirmed for ${formatDateTime(appointment.schedule!).dateTime} with Dr. ${appointment.primaryPhysician}` : `We regret to inform that your appointment for ${formatDateTime(appointment.schedule!).dateTime} is cancelled. Reason:  ${appointment.cancellationReason}`}.`;
    await sendSMSNotification(userId, smsMessage);

    revalidatePath("/admin");
    return parseStringify(updatedAppointment)
  } catch (error) {
    console.error("An error occurred while scheduling an appointment: ", error)
  }
}

// Get recent Appointment List
export const getRecentAppointmentList = async (hospitalId: string) => {
  console.log(hospitalId)
  try {
    const appointments = await databases.listDocuments(
      process.env.DATABASE_ID!,
      process.env.APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    )

    // Filter appointments.documents to get appointments from a specific hospital ID

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    }

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }

        return acc;
      }, initialCounts
    );

    // counts object serves a container of various appointment status and the total count of each
    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    }

    return parseStringify(data)
  } catch (error) {
    console.log("An error occurred while retrieving the recent appointments: ", error)
  }
}

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );
    return parseStringify(message);
  } catch (error) {
    console.error("An error occurred while sending sms: ", error)
  }
}
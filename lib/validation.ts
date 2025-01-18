// import { count } from "console";
// import { stat } from "fs";
import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const DoctorFormValidation = z.object({
  fullname: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  birthDate: z.coerce.date(),
  gender: z.enum(["male", "female", "other"]),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters")
    .max(500, "Occupation must be at most 500 characters"),
  emergencyContactName: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(50, "Contact name must be at most 50 characters"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Invalid phone number"
    ),
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  insuranceProvider: z
    .string()
    .min(2, "Insurance name must be at least 2 characters")
    .max(50, "Insurance name must be at most 50 characters"),
  insurancePolicyNumber: z
    .string()
    .min(2, "Policy number must be at least 2 characters")
    .max(50, "Policy number must be at most 50 characters"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to treatment in order to proceed",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to privacy in order to proceed",
    }),
});

export const BusinessFormValidation = z.object({
  hospitalName: z
    .string()
    .min(2, "Hospital name must be at least 2 characters")
    .max(100, "Hospital name must be at most 100 characters"),
  registrationNumber: z
    .string()
    .min(2, "Registration number must be at least 2 characters")
    .max(50, "Registration number must be at most 50 characters"),
  hospitalType: z
    .string()
    .min(2, "Select a hospital type"),
  hospitalLogo: z.custom<File[]>().optional(),
  email: z.string().email("Invalid email address"),
  foundingDate: z.coerce.date(),
  address1: z
  .string()
  .min(5, "Address must be at least 5 characters")
  .max(500, "Address must be at most 500 characters"),
  address2: z.string().optional(),
  city: z.string().min(2, "City name required"),
  stateOrProvince: z.string().min(2, "State/Province required"),
  country: z.string().min(2, "Country required"),
  postalCode: z
    .string()
    .min(4, "Invalid postal code")
    .max(10, "Invalid postal code"),
  primaryContactNumber: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  secondaryContactNumber: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  websiteUrl: z
    .string()
    .url("Invalid website URL"),
  adminName: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(100, "Contact name must be at most 100 characters"),
  adminContactNumber: z
    .string()
    .refine(
      (adminNumber) => /^\+\d{10,15}$/.test(adminNumber),
      "Invalid phone number"
    ),
  emergencyContact: z
    .string()
    .refine(
      (val) => /^\+\d{10,15}$/.test(val),
      "Invalid phone number"
    ),
  numberOfDepartments: z
    .string()
    .min(1, "Number of departments must be at least 1"),
  numberOfStaff: z
    .string()
    .min(1, "Number of staff required"),
  passcode: z
  .string()
  .min(6, "Has to be exactly 6 characters")
  .max(6, "Has to be exactly 6 characters"),
  openingTime: z.string().min(1, "Opening time required").optional(),
  closingTime: z.string().min(1, "Closing time required").optional(),
  
  // Arrays for multiple selections (checkbox groups)
  servicesOffered: z
    .array(z.string())
    .min(1, "Select at least one service"),
  accreditations: z
    .array(z.string())
    .optional(),
  licenseDocument: z.custom<File[]>().optional(),
  doctorsId: z.array(z.string()).optional(),

  // Arrays for checkbox groups
  paymentMethods: z
    .array(z.string())
    .min(1, "Select at least one payment method"),
    
  // insuranceProviders: z
  //   .array(z.string())
  //   .optional() || z.string().optional,
  dataPrivacyCompliance: z
  .boolean()
  .refine((val) => val === true, "You must agree to data privacy compliance"),
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}

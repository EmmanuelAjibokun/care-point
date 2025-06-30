/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "male" | "female" | "other";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
}

declare type CreateAppointmentParams = {
  userId: string;
  patient: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: Appointment;
  type: string;
};

declare type CreateDoctorParams = {
  fullname: string;
  email: string;
  phone: string;
}
declare type DoctorParams = {
  $id: string;
  fullname: string;
  email: string;
  phone: string;
}

declare type CreateBusinessParams = {
  hospitalName: string,
  registrationNumber: string,
  hospitalType: string,
  hospitalLogo: FormData | undefined,
  email: string,
  foundingDate: string | Date,
  address1: string,
  address2: string | undefined,
  city: string,
  stateOrProvince: string,
  country: string,
  postalCode: string,
  primaryContactNumber: string,
  secondaryContactNumber: string | undefined,
  websiteUrl: string | undefined,
  adminName: string,
  adminContactNumber: string,
  emergencyContact: string,
  numberOfDepartments: string,
  numberOfStaff: string,
  passcode: string,
  openingTime: string | undefined,
  closingTime: string | undefined,
  servicesOffered: string[],
  accreditations: string[],
  licenseDocument: FormData | undefined,
  doctorsId: string[] | undefined,
  paymentMethods: string[],
  insuranceProviders: string[],
  dataPrivacyCompliance: boolean,
};

declare type E164Number = string;

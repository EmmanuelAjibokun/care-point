"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";

import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { useState } from "react";
import { PatientFormValidation } from "@/lib/validation";
import { z } from "zod";
// import { useRouter } from "next/navigation";
// import { createUser } from "@/lib/actions/patient.actions";

import "react-phone-number-input/style.css";
import SubmitButton from "../SubmitButton";
import { SelectItem } from "../ui/select";

// List of doctors should be fetched from database
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import FileUploader from "../FileUploader";
// import { registerPatient } from "@/lib/actions/patient.actions";

const BusinessRegisterForm = () => {
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);

    // Store file info in form data as
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      // const patient = {
      //   name: values.name,
      //   email: values.email,
      //   phone: values.phone,
      //   birthDate: new Date(values.birthDate),
      //   gender: values.gender,
      //   address: values.address,
      //   occupation: values.occupation,
      //   emergencyContactName: values.emergencyContactName,
      //   emergencyContactNumber: values.emergencyContactNumber,
      //   primaryPhysician: values.primaryPhysician,
      //   insuranceProvider: values.insuranceProvider,
      //   insurancePolicyNumber: values.insurancePolicyNumber,
      //   allergies: values.allergies,
      //   currentMedication: values.currentMedication,
      //   familyMedicalHistory: values.familyMedicalHistory,
      //   pastMedicalHistory: values.pastMedicalHistory,
      //   identificationType: values.identificationType,
      //   identificationNumber: values.identificationNumber,
      //   identificationDocument: values.identificationDocument
      //     ? formData
      //     : undefined,
      //   privacyConsent: values.privacyConsent,
      // };
      // const newPatient = await registerPatient(patient);
      // if (newPatient) {
      //   router.push(`/patients/${user.$id}/new-appointment`);
      // }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about you.</p>
        </section>

        {/* BASIC INFORMATION */}
        <section className="space-y-6">
          <div className="space-y-1 mb-9">
            <h2 className="sub-header">Basic Information</h2>
          </div>

          {/* HOSPITAL NAME */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="hospitalName"
            label="Hospital Name"
            placeholder="City General Hospital"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          {/* REGISTRATION NUMBER */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="registrationNumber"
              label="Registration Number"
              placeholder="REG123456"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email address"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            {/* TYPE OF HOSPITAL(select field) */}

            {/* HOSPITAL LOGO (file Upload) */}
          </div>

          {/* BIRTHDATE & GENDER */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of birth"
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
        </section>

        {/* LOCATION DETAILS */}
        <section className="space-y-6">
          <div className="space-y-1 mb-9">
            <h2 className="sub-header">Location Details</h2>
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address1"
              label="Address Line 1"
              placeholder="Enter street address"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address2" // optional
              label="Address Line 2"
              placeholder="Apartment, suite, unit, etc."
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="city"
              label="City"
              placeholder="Enter city"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="stateOrProvince"
              label="State/Province"
              placeholder="Enter state or province"
            />

            {/* COUNTRY (Dropdown/Select Field) */}

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="postalCode"
              label="Postal Code"
              placeholder="Enter postal/ZIP code"
            />
          </div>
        </section>

        {/* CONTACT INFORMATION */}
        <section className="space-y-6">
          <div className="space-y-1 mb-9">
            <h2 className="sub-header">Contact Information</h2>
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="primaryContactNumber"
              label="Primary contact number"
              placeholder="(234) 801 234 5678"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="secondaryContactNumber"
              label="Secondary contact number"
              placeholder="(234) 801 234 5678"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter official email address"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="websiteUrl"
              label="Website URL"
              placeholder="Enter website URL"
            />
          </div>
        </section>

        {/* CONTACT INFORMATION */}
        <section className="space-y-6">
          <div className="space-y-1 mb-9">
            <h2 className="sub-header">Administrative Details</h2>
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="adminName"
              label="Director's/Administrator's Name"
              placeholder="Enter name of administrator"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="adminContactNumber"
              label="Director's/Administrator's contact number"
              placeholder="(234) 801 234 5678"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="numberOfDepartments"
              label="Number of Departments"
              placeholder="Enter number of departments"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="numberOfStaff"
              label="Number of Staff Members"
              placeholder="Enter total staff count"
            />

            {/* Doctors */}
            

          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-6 space-y-1">
            <h2 className="sub-header">Operational Details</h2>
          </div>

          <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContact"
              label="Emergency Contact"
              placeholder="Enter emergency contact number"
            />

          {/* PRIMARY CARE PHYSICIAN */}
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary care physician"
            placeholder="Select a physician"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          {/* OPERATING HOURS */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="operatingHours"
            label="Operating Hours"
            placeholder="Select operating hours"
          />
          
          {/* SERVICES OFFERED (Multi-Select Field) */}

          {/* ACCREDITATIONS (Multi-Select Field) */}

          {/* LICENSE UPLOAD (File Upload) */}
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />

        </section>

        {/* PAYMENT & INSURANCE */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Payment & Insurance</h2>
          </div>

          {/* Insurance Providers Supported (Multi-Select Field) */}
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="paymentMethods"
            label="Payment Methods"
            placeholder="Payment Methods Accepted"
            // Options: Cash, Credit/Debit Card, Online Transfer, Insurance
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          {/* Insurance Providers Supported (dynamically add by name) */}
        </section>

        {/* SECURITY AND COMPLIANCE */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Data Privacy Compliance (HIPAA/GDPR)</h2>
          </div>
            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="treatmentConsent"
              label="I confirm this hospital complies with data privacy laws."
            />
        </section>

        <SubmitButton isLoading={isLoading}> Submit and Continue </SubmitButton>
      </form>
    </Form>
  );
};

export default BusinessRegisterForm;

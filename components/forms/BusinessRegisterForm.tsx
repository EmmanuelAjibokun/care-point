"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import Image from "next/image";

import { Form, FormControl } from "@/components/ui/form";
// import CountryDropdown from "../ui/country-dropdown";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { useState } from "react";
import { BusinessFormValidation } from "@/lib/validation";
import { z } from "zod";
// import { useRouter } from "next/navigation";
// import { createUser } from "@/lib/actions/patient.actions";

import "react-phone-number-input/style.css";
import SubmitButton from "../SubmitButton";
import { SelectItem } from "../ui/select";

// List of doctors should be fetched from database
import {
  countries,
  HospitalTypes,
  BusinessFormDefaultValues,
} from "@/constants";
import FileUploader from "../FileUploader";
// import { registerPatient } from "@/lib/actions/patient.actions";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import DoctorForm from "./DoctorForm";

const BusinessRegisterForm = () => {
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const form = useForm<z.infer<typeof BusinessFormValidation>>({
    resolver: zodResolver(BusinessFormValidation),
    defaultValues: {
      ...BusinessFormDefaultValues,
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof BusinessFormValidation>) => {
    console.log("Triggered")
    setIsLoading(true);

    // Store file info in form data as
    let logoData;
    let licenseData;
    if (
      values.hospitalLogo &&
      values.hospitalLogo?.length > 0
    ) {
      const blobFile = new Blob([values.hospitalLogo[0]], {
        type: values.hospitalLogo[0].type,
      });

      logoData = new FormData();
      logoData.append("blobFile", blobFile);
      logoData.append("fileName", values.hospitalLogo[0].name);
    }
    if (
      values.licenseDocument &&
      values.licenseDocument?.length > 0
    ) {
      const blobFile = new Blob([values.licenseDocument[0]], {
        type: values.licenseDocument[0].type,
      });

      licenseData = new FormData();
      licenseData.append("blobFile", blobFile);
      licenseData.append("fileName", values.licenseDocument[0].name);
    }

    try {
      const hospital = {
        hospitalName: values.hospitalName,
        registrationNumber: values.registrationNumber,
        hospitalType: values.hospitalType,
        foundingDate: new Date(values.foundingDate),
        address1: values.address1,
        address2: values.address2,
        city: values.city,
        stateOrProvince: values.stateOrProvince,
        country: values.country,
        postalCode: values.postalCode,
        primaryContactNumber: values.primaryContactNumber,
        secondaryContactNumber: values.secondaryContactNumber,
        email: values.email,
        websiteUrl: values.websiteUrl,
        adminName: values.adminName,
        adminContactNumber: values.adminContactNumber,
        emergencyContact: values.emergencyContact,
        numberOfDepartments: values.numberOfDepartments,
        numberOfStaff: values.numberOfStaff,
        passcode: values.passcode,
        openingTime: values.openingTime,
        closingTime: values.closingTime,
        servicesOffered: values.servicesOffered,
        accreditations: values.accreditations,
        logo: logoData ? logoData : undefined,
        license: licenseData ? licenseData : undefined,
        doctorsId: values.doctorsId,
        paymentMethods: values.paymentMethods,
        insuranceProviders: [...tags],
        dataPrivacyCompliance: values.dataPrivacyCompliance,
      }

      console.log("New Hospital:", hospital);
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

  // const onSubmit = () => {
  //   console.log("clicked")
  //   setIsLoading(false)
  //   return
  // }

  // const handleCountrySelect = (countryCode: string) => {
  //   console.log('Selected country code:', countryCode);
  // };

  // Add a tag
  // const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter" && inputValue.trim() !== "") {
  //     if (!tags.includes(inputValue)) {
  //       setTags((prevTags) => [...prevTags, inputValue]);
  //     }
  //     setInputValue("");
  //   }
  // }

  // Remove a tag
  const removeTag = (indexToRemove: number) => {
    setTags((prevTags) =>
      prevTags.filter((_, index) => index !== indexToRemove)
    );
  };

  // const {watch} = form;
  // const formValues = watch();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        // onSubmit={onSubmit}
        onKeyDown={handleKeyDown}
        className="space-y-12 flex-1"
      >
        {/* {console.log(formValues)} */}
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-custom-gray">Tell us about your Company</p>
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
            iconSrc="/assets/icons/company.svg"
            iconAlt="company"
          />

          {/* REGISTRATION NUMBER */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="registrationNumber"
              label="Registration Number"
              placeholder="REG123456"
            />

            {/* TYPE OF HOSPITAL(select field) */}
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="hospitalType"
              label="Type of Hospital"
              placeholder="Select the type of your hospital"
            >
              {HospitalTypes.map((type, i) => (
                <SelectItem key={type + i} value={type}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <p>{type}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            {/* HOSPITAL LOGO (file Upload) */}
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="hospitalLogo"
              label="Hospital Logo (Supported Formats: .jpg, .png, .svg)"
              renderSkeleton={(field) => (
                <FormControl>
                  <FileUploader files={field.value} onChange={field.onChange} />
                </FormControl>
              )}
            />
          </div>

          {/* FOUNDING DATE */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="foundingDate"
              label="Founding Date"
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
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="country"
              label="Country"
              placeholder="Select your country"
            >
              {countries.map((type, i) => (
                <SelectItem key={type + i} value={type}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <p>{type}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.NUMBER_INPUT}
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
              name="websiteUrl" // Optional
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
              fieldType={FormFieldType.NUMBER_INPUT}
              control={form.control}
              name="numberOfDepartments"
              label="Number of Departments"
              placeholder="Enter number of departments"
            />

            <CustomFormField
              fieldType={FormFieldType.NUMBER_INPUT}
              control={form.control}
              name="numberOfStaff"
              label="Number of Staff Members"
              placeholder="Enter total staff count"
            />

            <CustomFormField
              fieldType={FormFieldType.NUMBER_INPUT}
              control={form.control}
              name="passcode"
              label="Passcode"
              placeholder="Enter preferred passcode: kindly take note of this"
            />

            {/* Add Doctors: pop-up modal */}
            {/* Doctors List */}
            <div></div>
            <Dialog open={open} onOpenChange={setOpen} >
              <DialogTrigger className="hover:text-green-500">Add Doctor +</DialogTrigger>
              <DialogContent className="shad-dialog">
                <DialogHeader>
                  <DialogTitle>Kindly add the details of your doctors</DialogTitle>
                  <DialogDescription>
                    <DoctorForm setOpen={setOpen} />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
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

          {/* OPERATING HOURS */}
          <CustomFormField
            fieldType={FormFieldType.TIME_PICKER}
            control={form.control}
            name="openingTime"
            label="Opening Time"
            // placeholder="Select operating hours"

          />
          <CustomFormField
            fieldType={FormFieldType.TIME_PICKER}
            control={form.control}
            name="closingTime"
            label="Closing Time"
            // placeholder="Select operating hours"

          />

          {/* SERVICES OFFERED (Multi-Select Field) */}
          <CustomFormField
            fieldType={FormFieldType.MULTI_CHECKBOX}
            control={form.control}
            name="servicesOffered"
            label="Select the services your hospital provides"
            options={[
              { label: "Emergency", value: "emergency" },
              { label: "OPD", value: "opd" },
              { label: "In-Patient", value: "in-patient" },
              { label: "Radiology", value: "radiology" },
              { label: "Pharmacy", value: "pharmacy" },
            ]}
          />

          {/* ACCREDITATIONS (Multi-Select Field) */}
          <CustomFormField
            fieldType={FormFieldType.MULTI_CHECKBOX}
            control={form.control}
            name="accreditations"
            label="Select accreditations your hospital holds"
            options={[
              { label: "JCI Accreditation", value: "jci" },
              { label: "NABH Accreditation", value: "nabh" },
              { label: "ISO Certification", value: "iso" },
            ]}
          />

          {/* LICENSE UPLOAD (File Upload) */}
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="licenseDocument"
            label="Scanned Copy of Operation License"
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

          {/* PAYMENT METHODS (Multi-Select Field) */}
          <CustomFormField
            fieldType={FormFieldType.MULTI_CHECKBOX}
            control={form.control}
            name="paymentMethods"
            label="Payment Methods Accepted"
            options={[
              { label: "Cash", value: "cash" },
              { label: "Credit/Debit Card", value: "creditOrDebitCard" },
              { label: "Online Transfer", value: "transfer" },
              { label: "Insurance", value: "insurance" },
            ]}
          />

          {/* Insurance Providers Supported (dynamically add by name): Tags Input */}
          <CustomFormField
            fieldType={FormFieldType.TAG_INPUT}
            control={form.control}
            name="insuranceProviders"
            label="Accepted Insurance Providers"
            placeholder="Enter insurance provider name"
            tags={tags}
            setTags={setTags}
            removeTag={removeTag}
          />

          {/* <div className="input-text-wrapper">
            <div className="tags-input">
              <div className="tags">
                <ul className="tags-list">
                  {tags.map((tag, index) => (
                    <li className="tags-item" key={index}>
                      <div className="input-tag">
                        <span className="tag-text">{tag}</span>
                        <button
                          type="button"
                          className="input-tag-delete-button"
                          onClick={() => removeTag(index)}
                          aria-label={`delete ${tag} tag`}
                        >
                          <span className="icon-x" aria-hidden="true">
                            x
                          </span>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <input
                id="elements"
                type="text"
                className="tags-input-text"
                placeholder="Add Insurance Provider here"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={addTag}
              />
            </div>
          </div> */}
        </section>

        {/* SECURITY AND COMPLIANCE */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Data Privacy Compliance (HIPAA/GDPR)</h2>
          </div>
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="dataPrivacyCompliance"
            label="I confirm this hospital complies with data privacy laws."
          />
        </section>

        <SubmitButton isLoading={isLoading}> Submit and Continue </SubmitButton>
      </form>
    </Form>
  );
};

export default BusinessRegisterForm;

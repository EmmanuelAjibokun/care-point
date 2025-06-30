"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { useState } from "react";
import { DoctorFormValidation } from "@/lib/validation";
import { z } from "zod";
import { registerDoctor } from "@/lib/actions/business.actions";

import "react-phone-number-input/style.css";
import SubmitButton from "../SubmitButton";


interface DoctorFormProps {
  setOpen: (open: boolean) => void;
  setDoctorsList: (doctors: Array<DoctorParams>) => void;
  doctorsList: Array<DoctorParams>;
}

const DoctorForm: React.FC<DoctorFormProps> = ({ setOpen, setDoctorsList, doctorsList}) => {
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof DoctorFormValidation>>({
    resolver: zodResolver(DoctorFormValidation),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
    },
  });
  // console.log("create newDoctor: ")

  // 2. Define a submit handler.
  const handleSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);

    try {
      const newDoctor: DoctorParams = await registerDoctor(data);
      setError("")
      console.log("newly added doctor: ", newDoctor)
      if(newDoctor) {
        setDoctorsList([...doctorsList, newDoctor])
        setOpen(false)
      }
    } catch (error) {
      console.log(error)
      setError("Account Registered. Incorrect Email or Phone Number.")
    }
    setOpen(false);
  });

  return (
    <Form {...form}>
      <form   className="mt-4 space-y-6 flex-1 text-start">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="fullname"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="Doctor"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="Manny@gmail.com"
          iconSrc="/assets/icons/user.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="(234) 801 234 5678"
        />

        <div>
        {error && <p className="shad-error text-12-regular mt-4 flex justify-center">{error}</p>}
        </div>
        
        <span onClick={handleSubmit}>
          <SubmitButton isLoading={isLoading}>Save</SubmitButton>
        </span>
      </form>
    </Form>
  );
};

export default DoctorForm;

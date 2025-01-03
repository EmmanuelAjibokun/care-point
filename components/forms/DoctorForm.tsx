"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

import "react-phone-number-input/style.css";
import SubmitButton from "../SubmitButton";


const DoctorForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  console.log("create newUser: ")

  // 2. Define a submit handler.
  const onSubmit = async ({ name, email, phone }: z.infer<typeof UserFormValidation>) => {

    setIsLoading(true);

    try {
      const userData = { name, email, phone }
      // console.log(createUser(userData))
      const newUser = await createUser(userData);
      console.log("create newUser: ", newUser)
      setError("")

      if(newUser[1]) {
        router.push(`/patients/${newUser[0].$id}/new-appointment`);
        return;
      }

      if(newUser) {
        router.push(`/patients/${newUser.$id}/register`)
      }
    } catch (error) {
      console.log(error)
      setError("Account Registered. Incorrect Email or Phone Number.")
    }

    setIsLoading(false);
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6 flex-1 text-start">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
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
        
        <SubmitButton isLoading={isLoading}>Save</SubmitButton>
      </form>
    </Form>
  );
};

export default DoctorForm;

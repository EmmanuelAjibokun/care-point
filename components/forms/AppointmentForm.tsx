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


const AppointmentForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async ({ name, email, phone }: z.infer<typeof UserFormValidation>) => {

    setIsLoading(true);

    try {
      const userData = { name, email, phone }
      console.log("userData", userData)
      // console.log(createUser(userData))
      const newUser = await createUser(userData);

      if(newUser) {
        router.push(`/Appointments/${newUser.$id}/register`)
      }
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false);
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="md-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>

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
        
        <SubmitButton isLoading={isLoading}> Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;

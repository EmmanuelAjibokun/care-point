/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from 'next/image'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { FormFieldType } from "./forms/PatientForm";
import PhoneInput from 'react-phone-number-input'
import { SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { Select, SelectContent } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  SELECT = "select",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SKELETON = "skeleton",
}

interface CustomProps {
  control: Control<any>,
  fieldType: FormFieldType,
  name: string,
  label?: string,
  placeholder?: string,
  iconSrc?: string,
  iconAlt?: string,
  disabled?: boolean,
  dataFormat?: string,
  showTimeSelect?: boolean,
  children?: React.ReactNode,
  renderSkeleton?: (field: any) => React.ReactNode,
}

const RenderField = ({ field, props } : { field: any; props: CustomProps}) => {
  const { fieldType, name, label, placeholder, iconSrc, iconAlt, disabled, dataFormat, showTimeSelect, renderSkeleton } = props;
    switch (fieldType) {
      case FormFieldType.INPUT:
        return (
          <div className="flex rounded-md border border-dark-500 bg-dark-400">
            {iconSrc && (
              <Image 
                src={iconSrc}
                height={24}
                width={24}
                alt={iconAlt || "icon"}
                className="ml-2"
              />
            )}

            <FormControl>
              <Input 
                placeholder={placeholder}
                {...field}
                className="Shad-input border-0"
              />
            </FormControl>
          </div>
        )
      case FormFieldType.PHONE_INPUT:
        return (
          <FormControl>
            <PhoneInput 
              defaultCountry="NG"
              placeholder={placeholder}
              international
              withCountryCallingCode
              value={field.value as E164Number | undefined}
              onChange={field.onChange}
              className="input-phone"
            />
          </FormControl>
        )
      case FormFieldType.DATE_PICKER: 
        return (
          <div className='flex rounded-md border border-dark-500 bg-dark-400'>
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt='calendar'
              className='ml-2'
            />
            <FormControl>
            <DatePicker 
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dataFormat ?? "MM/dd/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel='Time:'
              wrapperClassName='data-picker'
            />
            </FormControl>
          </div>
        )
      case FormFieldType.SKELETON:
        return (
          renderSkeleton ? renderSkeleton(field) : null
        )
      case FormFieldType.SELECT:
        return(
          <FormControl>
            <Select 
              onValueChange={field.onChange}
              defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger className='shad-select-trigger'>
                      <SelectValue placeholder={placeholder}/>
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent className='shad-select-content'>
                    {props.children}
                  </SelectContent>
              </Select>
          </FormControl>
        )
      case FormFieldType.TEXTAREA:
        return (
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              disabled={disabled} />
          </FormControl>
        )
      case FormFieldType.CHECKBOX:
        return (
          <FormControl>
            <div className='flex items-center gap-4'>
              <Checkbox 
                id={name}
                checked={field.value} 
                onCheckedChange={field.onChange}
                />
                <label htmlFor={name}
                className='checkbox-label'>
                  {label}
                </label>
            </div>
          </FormControl>
        )
    }
}


const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className='shad-input-label'>{label}</FormLabel>
          )}

          <RenderField field={field} props={props}/>

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;

/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
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
import PhoneInput from "react-phone-number-input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

export enum FormFieldType {
  INPUT = "input",
  NUMBER_INPUT = "number",
  TEXTAREA = "textarea",
  SELECT = "select",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SKELETON = "skeleton",
  MULTI_CHECKBOX = "multiCheckbox",
}

type option = {
  label: string;
  value: string;
}

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  options?: option[];
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    name,
    label,
    placeholder,
    iconSrc,
    iconAlt,
    disabled,
    dateFormat,
    showTimeSelect,
    renderSkeleton,
    options,
  } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-light-200 bg-green-100">
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
      );
    case FormFieldType.NUMBER_INPUT:
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
              type="number"
              className="Shad-input border-0"
            />
          </FormControl>
        </div>
      );
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
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
            className="ml-2"
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="data-picker"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea placeholder={placeholder} {...field} disabled={disabled} />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={name} className="checkbox-label">
              {label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldType.MULTI_CHECKBOX:
      return (
        <FormControl>
          <div className="space-y-2">
            {options?.map((option) => (
              <div key={option.value} className="flex items-center gap-4">
                <input
                  type="checkbox"
                  id={option.value}
                  value={option.value}
                  checked={field.value?.includes(option.value)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const updatedValues = checked
                      ? [...(field.value || []), option.value]
                      : (field.value || []).filter(
                          (val: string) => val !== option.value
                        );
                    field.onChange(updatedValues);
                  }}
                  className="checkbox-input"
                />
                <label htmlFor={option.value} className="checkbox-label">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </FormControl>
      );
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label">{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;

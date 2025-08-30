import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { ReactNode } from "react";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'file';
  disabled?: boolean;
  icon?: ReactNode;
}

const FormField = <T extends FieldValues>({ 
  name, 
  control, 
  label, 
  placeholder, 
  type = 'text', 
  disabled = false,
  icon 
}: FormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-gray-700 font-medium text-sm">{label}</FormLabel>
          <div className="relative mt-1">
            <FormControl>
              <Input 
                placeholder={placeholder} 
                type={type} 
                disabled={disabled}
                className={`pl-10 pr-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${disabled ? "bg-gray-100 text-gray-500" : "hover:border-gray-400"}`} 
                {...field} 
              />
            </FormControl>
            {icon && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {icon}
              </div>
            )}
          </div>
          <FormMessage className="text-red-500 text-xs mt-1" />
        </FormItem>
      )}
    />
  );
};

export default FormField;
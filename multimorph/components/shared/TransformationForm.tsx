"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  aspectRatioOptions,
  defaultValues,
  transformationTypes,
} from "@/constants";
import { CustomField } from "./CustomField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { AspectRatioKey } from "@/lib/utils";
import { CSSProperties } from 'react';

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

const TransformationForm = ({
  action,
  data = null,
  userId,
  type,
  creditBalance,
}: TransformationFormProps) => {
  const transformationType = transformationTypes[type];
  const [image, setImage] = useState(data);
  const [newTransformation, setnewTransformation] =
    useState<Transformations | null>(null);

  const intialValues =
    data && action === "Update"
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : defaultValues;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: intialValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const onSelectFieldHandler = (
    value: string,
    onChangeField: (value: string) => void
  ) => {};


  return (
    <div style={styles.formContainer}>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          style={styles.form}
        >
          <div style={styles.responsiveFieldContainer}>
            <CustomField
              control={form.control}
              name="title"
              formLabel="Image Title"
              render={({ field }) => (
                <Input
                  {...field}
                  style={applyPseudoStyles(styles.inputBase, {
                    ':focus': styles.inputFocus,
                    '::placeholder': styles.placeholder
                  })}
                  placeholder="Enter image title"
                />
              )}
            />
          </div>

          {type === "fill" && (
            <div style={styles.responsiveFieldContainer}>
              <CustomField
                control={form.control}
                name="aspectRatio"
                formLabel="Aspect Ratio"
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}
                  >
                    <SelectTrigger style={styles.selectTrigger}>
                      <SelectValue placeholder="Select aspect ratio" />
                    </SelectTrigger>
                    <SelectContent style={styles.selectContent}>
                      {Object.keys(aspectRatioOptions).map((key) => {
                        return (
                          <SelectItem
                            key={key}
                            value={key}
                            style={applyPseudoStyles(styles.selectItem, {
                              ':hover': styles.selectItemHover,
                              '&[data-highlighted]': styles.selectItemHighlighted
                            })}
                          >
                            {aspectRatioOptions[key as AspectRatioKey].label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

const styles: {
    formContainer: CSSProperties;
    form: CSSProperties;
    fieldContainer: CSSProperties;
    responsiveFieldContainer: CSSProperties & {
      '@media (min-width: 640px)'?: CSSProperties;
      '@media (min-width: 768px)'?: CSSProperties;
      '@media (min-width: 1024px)'?: CSSProperties;
    };
    inputBase: CSSProperties;
    inputFocus: CSSProperties;
    placeholder: CSSProperties;
    selectTrigger: CSSProperties;
    selectContent: CSSProperties;
    selectItem: CSSProperties;
    selectItemHover: CSSProperties;
    selectItemHighlighted: CSSProperties;
  } = {
    formContainer: {
      width: '100%',
      maxWidth: '1024px',
      margin: '80px auto 0', // Added top margin for header
      padding: '0 16px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    fieldContainer: {
      width: '100%',
      marginBottom: '8px'
    },
    responsiveFieldContainer: {
      width: '100%',
      '@media (min-width: 640px)': {
        width: '90%',
        margin: '0 auto'
      },
      '@media (min-width: 768px)': {
        width: '80%'
      },
      '@media (min-width: 1024px)': {
        width: '70%'
      }
    
    },
    inputBase: {
      width: '100%',
      border: '2px solid rgba(216, 180, 254, 0.2)',
      borderRadius: '16px',
      boxShadow: '0 1px 3px rgba(216, 180, 254, 0.1)',
      color: '#374151',
      fontWeight: 600,
      height: '50px',
      padding: '0 24px',
      backgroundColor: 'white',
      transition: 'all 0.2s ease',
      fontSize: '15px'
    },
    inputFocus: {
      outline: 'none',
      borderColor: 'rgba(167, 139, 250, 0.4)',
      boxShadow: '0 0 0 3px rgba(216, 180, 254, 0.2)'
    },
    placeholder: {
      color: '#9CA3AF',
      fontWeight: 500
    },
    selectTrigger: {
      width: '100%',
      border: '2px solid rgba(216, 180, 254, 0.2)',
      borderRadius: '16px',
      boxShadow: '0 1px 3px rgba(216, 180, 254, 0.1)',
      color: '#374151',
      fontWeight: 600,
      height: '50px',
      padding: '0 24px',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    selectContent: {
      borderRadius: '12px',
      border: '1px solid rgba(216, 180, 254, 0.2)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      padding: '8px',
      backgroundColor: 'white',
      zIndex: 50
    },
    selectItem: {
      padding: '12px 24px',
      cursor: 'pointer',
      borderRadius: '8px',
      margin: '2px 0',
      fontSize: '15px',
      color: '#374151',
      transition: 'all 0.15s ease'
    },
    selectItemHover: {
      backgroundColor: 'rgba(219, 234, 254, 0.5)'
    },
    selectItemHighlighted: {
      backgroundColor: 'rgba(219, 234, 254, 0.8)',
      color: '#1E40AF'
    }
  };
  
  const applyPseudoStyles = (base: CSSProperties, pseudo: Record<string, CSSProperties>) => {
    return {
      ...base,
      ...Object.entries(pseudo).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, CSSProperties>)
    };
  };

export default TransformationForm;

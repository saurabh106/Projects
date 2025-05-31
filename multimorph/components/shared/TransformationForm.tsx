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
  creditFee,
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
import { useState, useTransition } from "react";
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils";
import { CSSProperties } from "react";
import { ValueOf } from "next/dist/shared/lib/constants";
import { config } from "process";
import { updateCredits } from "@/lib/actions/user.actions";
import MediaUploader from "./MediaUploader";

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
  config = null,
}: TransformationFormProps) => {
  const transformationType = transformationTypes[type];
  const [image, setImage] = useState(data);
  const [newTransformation, setnewTransformation] =
    useState<Transformations | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationConfig, setTransformationConfig] = useState(config);

  const [isPending, startTransition] = useTransition();

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
  ) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey];

    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }));
    setnewTransformation(transformationType.config);

    return onChangeField(value);
  };

  const onInputChangeHandler = (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void
  ) => {
    debounce(() => {
      setnewTransformation((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName === "prompt" ? "prompt" : "to"]: value,
        },
      }));
      return onChangeField(value);
    }, 1000);
  };

  //TODO: Return to updated creditsaz
  const onTransformHandler = async () => {
    setIsTransforming(true);

    setTransformationConfig(
      deepMergeObjects(newTransformation, transformationConfig)
    );
    setnewTransformation(null)

    startTransition(async ()=>{
        // await updateCredits(userId,creditFee)
    })
  };

  return (
    <div style={styles.formContainer}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} style={styles.form}>
          <div style={styles.responsiveFieldContainer}>
            <CustomField
              control={form.control}
              name="title"
              formLabel="Image Title"
              render={({ field }) => (
                <Input
                  {...field}
                  style={applyPseudoStyles(styles.inputBase, {
                    ":focus": styles.inputFocus,
                    "::placeholder": styles.placeholder,
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
                    onValueChange={(value) =>
                      onSelectFieldHandler(value, field.onChange)
                    }
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
                              ":hover": styles.selectItemHover,
                              "&[data-highlighted]":
                                styles.selectItemHighlighted,
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

          {(type === "remove" || type === "recolor") && (
            <div style={styles.responsiveRow}>
              <CustomField
                control={form.control}
                name="prompt"
                formLabel={
                  type === "remove" ? "Object to remove" : "Object to recolor"
                }
                // style={{ width: "100%" }}
                render={({ field }) => (
                  <Input
                    value={field.value}
                    style={styles.inputBase}
                    onChange={(e) =>
                      onInputChangeHandler(
                        "prompt",
                        e.target.value,
                        type,
                        field.onChange
                      )
                    }
                  />
                )}
              />

              {type == "recolor" && (
                <CustomField
                  control={form.control}
                  name="color"
                  formLabel="Replacement Color"
                  //   style={{ width: "100%" }}
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      style={styles.inputBase}
                      onChange={(e) =>
                        onInputChangeHandler(
                          "color",
                          e.target.value,
                          "recolor",
                          field.onChange
                        )
                      }
                    />
                  )}
                />
              )}
            </div>
          )}


<div className="media-uploader-field">
          <CustomField 
            control={form.control}
            name="publicId"
            className="flex size-full flex-col"
            render={({ field }) => (
              <MediaUploader 
                onValueChange={field.onChange}
                setImage={setImage}
                publicId={field.value}
                image={image}
                type={type}
              />
            )}
          />

          {/* <TransformedImage 
            image={image}
            type={type}
            title={form.getValues().title}
            isTransforming={isTransforming}
            setIsTransforming={setIsTransforming}
            transformationConfig={transformationConfig}
          /> */}
        </div>

          <div style={styles.buttonGroup}>
            <button
              type="button"
              style={{
                ...styles.buttonBase,
                ...(isTransforming || newTransformation === null
                  ? styles.buttonDisabled
                  : {}),
              }}
              disabled={isTransforming || newTransformation === null}
              onClick={onTransformHandler}
            >
              {isTransforming ? "Transforming..." : "Apply Transformation"}
            </button>

            <button
              type="submit"
              style={{
                ...styles.buttonBase,
                ...(isSubmitting ? styles.buttonDisabled : {}),
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Save Image"}
            </button>
          </div>
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
    "@media (min-width: 640px)"?: CSSProperties;
    "@media (min-width: 768px)"?: CSSProperties;
    "@media (min-width: 1024px)"?: CSSProperties;
  };
  inputBase: CSSProperties;
  inputFocus: CSSProperties;
  placeholder: CSSProperties;
  selectTrigger: CSSProperties;
  selectContent: CSSProperties;
  selectItem: CSSProperties;
  selectItemHover: CSSProperties;
  selectItemHighlighted: CSSProperties;
  buttonGroup: CSSProperties;
  buttonBase: CSSProperties & {
    "@media (min-width: 768px)"?: CSSProperties;
  };
  buttonDisabled: CSSProperties;
  responsiveRow: CSSProperties & {
    "@media (min-width: 1024px)"?: CSSProperties;
  };
} = {
  formContainer: {
    width: "100%",
    maxWidth: "1024px",
    margin: "80px auto 0",
    padding: "0 16px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  fieldContainer: {
    width: "100%",
    marginBottom: "8px",
  },
  responsiveFieldContainer: {
    width: "100%",
    "@media (min-width: 640px)": {
      width: "90%",
      margin: "0 auto",
    },
    "@media (min-width: 768px)": {
      width: "80%",
    },
    "@media (min-width: 1024px)": {
      width: "70%",
    },
  },
  inputBase: {
    width: "100%",
    border: "2px solid rgba(216, 180, 254, 0.2)",
    borderRadius: "16px",
    boxShadow: "0 1px 3px rgba(216, 180, 254, 0.1)",
    color: "#374151",
    fontWeight: 600,
    height: "50px",
    padding: "0 24px",
    backgroundColor: "white",
    transition: "all 0.2s ease",
    fontSize: "15px",
  },
  inputFocus: {
    outline: "none",
    borderColor: "rgba(167, 139, 250, 0.4)",
    boxShadow: "0 0 0 3px rgba(216, 180, 254, 0.2)",
  },
  placeholder: {
    color: "#9CA3AF",
    fontWeight: 500,
  },
  selectTrigger: {
    width: "100%",
    border: "2px solid rgba(216, 180, 254, 0.2)",
    borderRadius: "16px",
    boxShadow: "0 1px 3px rgba(216, 180, 254, 0.1)",
    color: "#374151",
    fontWeight: 600,
    height: "50px",
    padding: "0 24px",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectContent: {
    borderRadius: "12px",
    border: "1px solid rgba(216, 180, 254, 0.2)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    padding: "8px",
    backgroundColor: "white",
    zIndex: 50,
  },
  selectItem: {
    padding: "12px 24px",
    cursor: "pointer",
    borderRadius: "8px",
    margin: "2px 0",
    fontSize: "15px",
    color: "#374151",
    transition: "all 0.15s ease",
  },
  selectItemHover: {
    backgroundColor: "rgba(219, 234, 254, 0.5)",
  },
  selectItemHighlighted: {
    backgroundColor: "rgba(219, 234, 254, 0.8)",
    color: "#1E40AF",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  buttonBase: {
    background: "linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)",
    backgroundSize: "cover",
    borderRadius: "9999px",
    padding: "16px 24px",
    fontWeight: 600,
    height: "50px",
    width: "100%",
    color: "white",
    border: "none",
    cursor: "pointer",
    textTransform: "capitalize",
    transition: "all 0.2s ease",
    "@media (min-width: 768px)": {
      height: "54px",
    },
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
    background: "linear-gradient(90deg, #64748b 0%, #94a3b8 100%)",
  },
  responsiveRow: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    "@media (min-width: 1024px)": {
      flexDirection: "row",
      gap: "40px",
    },
  },
};

const applyPseudoStyles = (
  base: CSSProperties,
  pseudo: Record<string, CSSProperties>
) => {
  return {
    ...base,
    ...Object.entries(pseudo).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, CSSProperties>),
  };
};

export default TransformationForm;

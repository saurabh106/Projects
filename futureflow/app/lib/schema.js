// This is schema is use to validate the form that user fill using zod
//Creating schema using zod
import { z } from "zod";

export const onboardingSchema = z.object({
  industry: z.string({
    required_error: "Please select an industry ",
  }),
  subIndustry: z.string({
    required_error: "Please select an specialization ",
  }),
  bio: z
    .string()
    .max(500, {
      message: "Bio must be at most 200 characters long",
    })
    .optional(),

  experience: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .min(0, "Experience must be at least 0 years")
        .max(50, "Experience must be at most 50 years")
    ),
  skills: z.string().transform((val) =>
    val
      ? val
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : undefined
  ),
});

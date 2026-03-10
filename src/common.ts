import z from "zod";

const LatexString = z
  .string()
  .transform((s) =>
    s.replaceAll("$", "\\$").replaceAll("&", "\\&").replaceAll("%", "\\%"),
  );

export type ResumeData = z.infer<typeof ResumeDataSchema>;
export const ResumeDataSchema = z.object({
  name: LatexString,
  email: z.email(),
  phone_number: LatexString,
  x: z.optional(LatexString),
  linkedin: LatexString,
  summary: LatexString,
  location: LatexString,
  skills: z.array(
    z.object({
      label: LatexString,
      description: LatexString,
    }),
  ),
  experiences: z.array(
    z.object({
      company: LatexString,
      job: LatexString,
      time: LatexString,
      details: z.array(LatexString),
      location: LatexString,
    }),
  ),
  miscellaneous: z.array(
    z.object({
      label: LatexString,
      description: LatexString,
    }),
  ),
  education: z.array(
    z.object({
      school: LatexString,
      details: z.array(LatexString),
      time: LatexString,
      degree: LatexString,
      location: LatexString,
    }),
  ),
});

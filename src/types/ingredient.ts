import z from "zod";

export const ingredientSchema = z.object({
  id: z.number().optional(),
  nom: z.string().max(90),
  type: z.enum(["épice", "légume", "viande"]),
  created_at: z.iso.datetime().optional(),
  updated_at: z.iso.datetime().optional(),
});

export const ingredientTypeSchema = z.object({
  type: z.enum(["épice", "légume", "viande"]),
});

export type TIngredient = z.infer<typeof ingredientSchema>;
export type TIngredientType = z.infer<typeof ingredientTypeSchema>;

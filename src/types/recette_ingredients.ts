import z from "zod";

export const recetteIngredientSchema = z.object({
  recette_id: z.number(),
  ingredient_id: z.number(),
  quantite: z.string().max(90),
});

export const recetteIngredientAddSchema = z.object({
  ingredient_id: z.number(),
  quantite: z.string().min(1).max(90),
});

export type TRecetteIngredient = z.infer<typeof recetteIngredientSchema>;
export type TRecetteIngredientAdd = z.infer<typeof recetteIngredientAddSchema>;

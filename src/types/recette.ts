import z from "zod";

export const recetteSchema = z.object({
  id: z.number().optional(),
  nom: z.string().max(90),
  description: z.string().max(290).optional(),
  temps_preparation: z.number().int().positive().optional(),
  niveau_difficulte: z.enum(["facile", "moyen", "difficile"]),
  created_at: z.iso.datetime().optional(),
  updated_at: z.iso.datetime().optional(),
});
export type TRecette = z.infer<typeof recetteSchema>;

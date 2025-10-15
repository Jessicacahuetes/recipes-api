import { Router } from "express";
import {
  createRecette,
  deleteRecette,
  getRecette,
  getRecetteById,
  updateRecette,
} from "../controllers/recettesControllers";
import { validate } from "../validations/validate";
import { recetteSchema } from "../types/recette";
import {
  addIngredientToRecette,
  deleteIngredientFromRecette,
  getIngredientsByRecetteId,
} from "../controllers/recetteIngredientsControllers";
import {
  recetteIngredientAddSchema,
  recetteIngredientSchema,
} from "../types/recette_ingredients";

const router = Router();

// Route GET : lister toutes les recettes
router.get("/", getRecette);

// Route GET : récupérer une recette spécifique
router.get("/:id", getRecetteById);

// Route GET : récupérer tous les ingrédients d'une recette
router.get("/:id/ingredients", getIngredientsByRecetteId);

// Route POST : créer une nouvelle recette
router.post("/", validate(recetteSchema), createRecette);

// Route POST : Ajouter un ingrédient à une recette
router.post(
  "/:id/ingredients",
  validate(recetteIngredientAddSchema),
  addIngredientToRecette
);

// Route PUT : modifier une recette
router.put("/:id", validate(recetteSchema.partial()), updateRecette);

//Route DELETE: supprimer un ingredient d'une recette.
router.delete("/:id/:ingredientId", deleteIngredientFromRecette);

// Route DELETE : supprimer une recette
router.delete("/:id", deleteRecette);

export default router;

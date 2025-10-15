import { Router } from "express";
import {
  createIngredient,
  deleteIngredient,
  getIngredient,
  getIngredientById,
  getIngredientsByType,
  updateIngredient,
} from "../controllers/ingredientsControllers";
import { validate } from "../validations/validate";
import { ingredientSchema, ingredientTypeSchema } from "../types/ingredient";

const router = Router();

// Route GET : filtrer les ingrédients par type
router.get("/", getIngredientsByType);

// Route GET : lister touts les ingredients
router.get("/", getIngredient);

// Route POST : créer un nouvel ingredient
router.post("/", validate(ingredientSchema), createIngredient);

// Route GET : récupérer un ingrédient spécifique
router.get("/:id", getIngredientById);

// Route PUT : modifier un ingrédient
router.put("/:id", validate(ingredientSchema.partial()), updateIngredient);

// Route DELETE : supprimer une ingredient
router.delete("/:id", deleteIngredient);

export default router;

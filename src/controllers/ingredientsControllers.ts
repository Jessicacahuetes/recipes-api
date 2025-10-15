import { type Request, type Response, type NextFunction } from "express";
import {
  createIngredientService,
  deleteIngredientService,
  getIngredientByIdService,
  getIngredientsByTypeService,
  getIngredientService,
  updateIngredientService,
} from "../services/ingredientsServices";
import { NotFoundError } from "../class/errorCustom";
import { ingredientTypeSchema } from "../types/ingredient";

// Afficher toutes les ingrédients
export const getIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ingredients = await getIngredientService();
    res.status(200).json({
      status: "ok",
      data: ingredients,
    });
  } catch (err) {
    next(err);
  }
};

// Ajouter un ingredient
export const createIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newingredient = await createIngredientService(req.body);
    res.status(201).json({
      status: "ok",
      data: newingredient,
    });
  } catch (err) {
    next(err);
  }
};

// afficher un ingredient particulier
export const getIngredientById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id); // convertir l'id en nombre

    if (isNaN(id)) {
      throw new NotFoundError(`Ingredient with id: ${id} is invalid`);
    }
    const ingredient = await getIngredientByIdService(id);

    res.status(200).json({
      status: "ok",
      data: ingredient,
    });
  } catch (err) {
    next(err);
  }
};

//modifier un ingredient
export const updateIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id); // convertir l'id en nombre

    if (isNaN(id)) {
      throw new NotFoundError(`Ingredient with id: ${id} doesn't exist`);
    }
    const updatedIngredient = await updateIngredientService(id, req.body);

    if (!updatedIngredient) {
      throw new NotFoundError(`Ingredient with id: ${id} doesn't exist`);
    }

    res.status(200).json({
      status: "ok",
      data: updatedIngredient,
    });
  } catch (err) {
    next(err);
  }
};

//supprimer un ingredient
export const deleteIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id); // convertir l'id en nombre

    if (isNaN(id)) {
      throw new NotFoundError(`Ingredient with id: ${id} is invalid`);
    }
    const message = await deleteIngredientService(id);

    res.status(200).json({
      status: "ok",
      message,
    });
  } catch (err) {
    next(err);
  }
};

// filtrer par type d'ingredient
export const getIngredientsByType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type } = req.query;

    if (!type) {
      throw new NotFoundError("Missing type");
    }

    const parsed = ingredientTypeSchema.parse({ type });

    console.log("Filtrage demandé sur le type :", type);

    const ingredients = await getIngredientsByTypeService(parsed);
    res.status(200).json({
      status: "ok",
      data: ingredients,
    });
  } catch (err) {
    next(err);
  }
};

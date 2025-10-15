import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../class/errorCustom";
import {
  addIngredientToRecetteService,
  deleteIngredientFromRecetteService,
  getIngredientsByRecetteIdService,
} from "../services/recetteIngredientsService";
import { TRecetteIngredient } from "../types/recette_ingredients";

//
export const getIngredientsByRecetteId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //on récupère l'id et on le converti en nombre
    const recetteId = Number(req.params.id);

    if (isNaN(recetteId)) {
      throw new NotFoundError(`Invalid recipe's id`);
    }
    // on appelle le service pour récupérer les ingrédients
    const indredients = await getIngredientsByRecetteIdService(recetteId);

    res.status(201).json({
      status: "ok",
      data: indredients,
    });
  } catch (err) {
    next(err);
  }
};

//on ajoute un ingrédient à une recette précise
export const addIngredientToRecette = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //on récup l'id dans les params
    const recetteId = Number(req.params.id);
    if (isNaN(recetteId)) {
      throw new NotFoundError(`Recipe's id doesn't exist`);
    }

    // on récup le body
    const { ingredient_id, quantite } = req.body;

    const ingredientId = Number(ingredient_id);

    if (isNaN(recetteId) || isNaN(ingredientId)) {
      throw new NotFoundError("Wrong recipe's id or ingredient's id");
    }

    if (!quantite) {
      throw new NotFoundError("Missing quantity");
    }

    const newIngredient = await addIngredientToRecetteService(recetteId, {
      ingredient_id: ingredientId,
      quantite: quantite,
    });

    res.status(201).json({
      status: "ok",
      data: newIngredient,
    });
  } catch (err) {
    next(err);
  }
};

//on supprime un ingrediant à une recette
export const deleteIngredientFromRecette = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recetteId = Number(req.params.id);
    const ingredientId = Number(req.params.ingredientId);

    if (isNaN(recetteId) || isNaN(ingredientId)) {
      throw new Error("Invalid recetteId or ingredientId");
    }

    await deleteIngredientFromRecetteService(recetteId, ingredientId);

    res.status(200).json({
      status: "ok",
      message: `Ingredient ah been deletd from this recipe`,
    });
  } catch (err) {
    next(err);
  }
};

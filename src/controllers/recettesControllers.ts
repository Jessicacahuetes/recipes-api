import { type Request, type Response, type NextFunction } from "express";
import {
  createRecetteService,
  deleteRecetteService,
  getRecetteByIdService,
  getRecetteService,
  updateRecetteService,
} from "../services/recettesServices";
import { NotFoundError } from "../class/errorCustom";

// Créer une recette
export const createRecette = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newRecipe = await createRecetteService(req.body);
    res.status(201).json({
      status: "ok",
      data: newRecipe,
    });
  } catch (err) {
    next(err);
  }
};

// Afficher toutes les recettes
export const getRecette = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recipes = await getRecetteService();
    res.status(200).json({
      status: "ok",
      data: recipes,
    });
  } catch (err) {
    next(err);
  }
};

// Afficher une recette particulière
export const getRecetteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id); // convertir l'id en nombre

    if (isNaN(id)) {
      throw new NotFoundError(`Recipe with id: ${id} is invalid`);
    }
    const recipe = await getRecetteByIdService(id);

    res.status(200).json({
      status: "ok",
      data: recipe,
    });
  } catch (err) {
    next(err);
  }
};

//modifier une recette
export const updateRecette = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id); // convertir l'id en nombre

    if (isNaN(id)) {
      throw new NotFoundError(`Recipe with id: ${id} doesn't exist`);
    }
    const updatedRecipe = await updateRecetteService(id, req.body);

    if (!updatedRecipe) {
      throw new NotFoundError(`Recipe with id : ${id} doesn't exist`);
    }

    res.status(200).json({
      status: "ok",
      data: updatedRecipe,
    });
  } catch (err) {
    next(err);
  }
};

//supprimer une recette
export const deleteRecette = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id); // convertir l'id en nombre

    if (isNaN(id)) {
      throw new NotFoundError(`Recipe with id: ${id} is invalid`);
    }
    const message = await deleteRecetteService(id);

    res.status(200).json({
      status: "ok",
      message,
    });
  } catch (err) {
    next(err);
  }
};

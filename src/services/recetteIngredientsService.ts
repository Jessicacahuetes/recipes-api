import { QueryResult } from "pg";
import { client } from "../pg-db";
import { TIngredient } from "../types/ingredient";
import {
  TRecetteIngredient,
  TRecetteIngredientAdd,
} from "../types/recette_ingredients";
import { NotFoundError } from "../class/errorCustom";

interface IngredientwithQuantity extends TIngredient {
  quantite: string;
}

// requête pour avoir tous les ingédients d'une recette spécifique.
export const getIngredientsByRecetteIdService = async (
  recetteId: number
): Promise<IngredientwithQuantity[]> => {
  const query = `
    SELECT i.id, i.nom, i.type, ri.quantite 
    FROM ingredients i 
    JOIN recette_ingredients ri ON i.id = ri.ingredient_id 
    WHERE ri.recette_id = $1
    `;
  const values = [recetteId];

  const result: QueryResult<IngredientwithQuantity> = await client.query(
    query,
    values
  );

  if (result.rowCount === 0) {
    throw new NotFoundError("No ingredient for this recipe");
  }
  return result.rows;
};

// requête pour ajouter un ingrédient à une recette.

export const addIngredientToRecetteService = async (
  recetteId: number,
  ingredient: TRecetteIngredientAdd
): Promise<TRecetteIngredientAdd> => {
  if (!ingredient) {
    throw new Error("Missing Ingredient");
  }
  const query = `
    INSERT INTO recette_ingredients (recette_id, ingredient_id, quantite)
    VALUES ($1, $2, $3)
    RETURNING *
    `;
  const values = [recetteId, ingredient.ingredient_id, ingredient.quantite];

  const result: QueryResult<TRecetteIngredientAdd> = await client.query(
    query,
    values
  );

  return result.rows[0] as TRecetteIngredientAdd;
};

//requête pour supprimer un ingredient d'une recette spécifique.
export const deleteIngredientFromRecetteService = async (
  recetteId: number,
  ingredientId: number
): Promise<void> => {
  const query = `
    DELETE FROM recette_ingredients
    WHERE recette_id = $1 AND ingredient_id = $2
    RETURNING *
  `;

  const values = [recetteId, ingredientId];

  const result = await client.query(query, values);

  if (result.rowCount === 0) {
    throw new NotFoundError(`No link found between the recipe and ingredient`);
  }
};

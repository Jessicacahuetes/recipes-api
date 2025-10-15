import { NotFoundError } from "../class/errorCustom";
import { client } from "../pg-db";
import { TIngredient, TIngredientType } from "../types/ingredient";

// requête pur récupérer tous les ingredients
export const getIngredientService = async (): Promise<TIngredient[]> => {
  const query = `SELECT * FROM ingredients`;
  const result = await client.query(query);
  return result.rows;
};

//requête pour ajouter un ingrédient
export const createIngredientService = async (ingredient: TIngredient) => {
  const query = `
    INSERT INTO ingredients (nom, type)
    VALUES ($1, $2)
    RETURNING *
  `;
  const values = [ingredient.nom, ingredient.type];
  const result = await client.query(query, values);
  return result.rows[0];
};

//requête pour afficher un indredient particulier
export const getIngredientByIdService = async (
  id: number
): Promise<TIngredient> => {
  const query = `
  SELECT * FROM ingredients
  WHERE id = $1
  `;
  const values = [id];
  const result = await client.query(query, values);

  if (result.rowCount === 0) {
    throw new NotFoundError(`Ingredient with id : ${id} doesn't exist`);
  }
  return result.rows[0];
};

// requête pour modifier un ingrédient
export const updateIngredientService = async (
  id: number,
  ingredient: Omit<TIngredient, "id" | "created_at">
): Promise<TIngredient> => {
  const query = `
    UPDATE ingredients
    SET nom = COALESCE($1, nom),
    type = COALESCE($2, type),
    updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING *
  `;

  const values = [ingredient.nom || null, ingredient.type || null, id];

  const result = await client.query(query, values);
  if (result.rowCount === 0) {
    throw new NotFoundError(`Ingredient with id : ${id} doesn't exist`);
  }

  return result.rows[0];
};

// requête pour supprimer un ingredient
export const deleteIngredientService = async (id: number): Promise<string> => {
  const query = `
  DELETE FROM ingredients
  WHERE id = $1
  RETURNING *
  `;
  const values = [id];

  const result = await client.query(query, values);

  if (result.rowCount === 0) {
    throw new NotFoundError(`Ingredient with id: ${id} doesn't exist`);
  }
  return `Ingredient has been deleted successfully.`;
};

// réquête pour filtrer les ingrédient par type
export const getIngredientsByTypeService = async ({
  type,
}: TIngredientType): Promise<TIngredient[]> => {
  const query = `
    SELECT * 
    FROM ingredients
    WHERE type = $1
  `;
  const values = [type];
  const result = await client.query<TIngredient>(query, values);

  if (result.rowCount === 0) {
    throw new NotFoundError(`No ingredients found for type: ${type}`);
  }

  return result.rows;
};

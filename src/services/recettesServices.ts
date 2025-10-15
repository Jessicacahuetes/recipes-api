import { NotFoundError } from "../class/errorCustom";
import { client } from "../pg-db";
import { TRecette } from "../types/recette";

// requête pour créer une recette
export const createRecetteService = async (recette: TRecette) => {
  const query = `
    INSERT INTO recettes (nom, description, temps_preparation, niveau_difficulte)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const values = [
    recette.nom,
    recette.description || null,
    recette.temps_preparation || null,
    recette.niveau_difficulte,
  ];
  const result = await client.query(query, values);
  return result.rows[0];
};

// requête pour afficher toutes les recettes
export const getRecetteService = async (): Promise<TRecette[]> => {
  const query = `SELECT * FROM recettes `;
  const result = await client.query(query);
  return result.rows;
};

//requête pour avoir le détail d'une recette
export const getRecetteByIdService = async (id: number): Promise<TRecette> => {
  const query = `
  SELECT * FROM recettes
  WHERE id = $1
  `;
  const values = [id];
  const result = await client.query(query, values);

  if (result.rowCount === 0) {
    throw new NotFoundError(`Recipe with id : ${id} doesn't exist`);
  }
  return result.rows[0];
};

// requête pour modifier une recette
export const updateRecetteService = async (
  id: number,
  recipe: Omit<TRecette, "id" | "created_at">
): Promise<TRecette> => {
  const query = `
    UPDATE recettes
    SET nom = COALESCE($1, nom),
    description = COALESCE($2, description),
    temps_preparation = COALESCE($3, temps_preparation),
    niveau_difficulte = COALESCE($4, niveau_difficulte),
    updated_at = CURRENT_TIMESTAMP
    WHERE id = $5
    RETURNING *
  `;

  const values = [
    recipe.nom || null,
    recipe.description || null,
    recipe.temps_preparation || null,
    recipe.niveau_difficulte || null,
    id,
  ];

  const result = await client.query(query, values);
  if (result.rowCount === 0) {
    throw new NotFoundError(`Recipe with id : ${id} doesn't exist`);
  }

  return result.rows[0];
};

// requête pour supprimer une recette
export const deleteRecetteService = async (id: number): Promise<string> => {
  const query = `
  DELETE FROM recettes
  WHERE id = $1
  RETURNING *
  `;
  const values = [id];

  const result = await client.query(query, values);

  if (result.rowCount === 0) {
    throw new NotFoundError(`Recipe with id: ${id} doesn't exist`);
  }
  return `Recipe has been deleted successfully.`;
};

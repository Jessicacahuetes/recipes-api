import { addIngredientToRecette } from "../../controllers/recetteIngredientsControllers";
import { addIngredientToRecetteService } from "../../services/recetteIngredientsService";
import { NotFoundError } from "../../class/errorCustom";

jest.mock("../../services/recetteIngredientsService");

describe("addIngredientToRecette", () => {
  test("retourne un statut 201 et l'objet créé", async () => {
    (addIngredientToRecetteService as jest.Mock).mockResolvedValue({
      recette_id: 1,
      ingredient_id: 2,
      quantite: "300g",
    });

    const req: any = {
      params: { id: "1" },
      body: { ingredient_id: 2, quantite: "300g" },
    };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await addIngredientToRecette(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "ok",
      data: { recette_id: 1, ingredient_id: 2, quantite: "300g" },
    });
  });

  test("retourne NotFoundError via next", async () => {
    (addIngredientToRecetteService as jest.Mock).mockRejectedValue(
      new NotFoundError("Ingredient not found")
    );

    const req: any = {
      params: { id: "1" },
      body: { ingredient_id: 999, quantite: "n/a" },
    };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await addIngredientToRecette(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
  });
});

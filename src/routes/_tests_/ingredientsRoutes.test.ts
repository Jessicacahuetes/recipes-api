import request from "supertest";
import app from "../../app";
import { getIngredientsByTypeService } from "../../services/ingredientsServices";
import { NotFoundError } from "../../class/errorCustom";

jest.mock("../../services/ingredientsServices", () => ({
  getIngredientsByTypeService: jest.fn(),
}));

describe("GET /api/ingredients?type=...", () => {
  test("renvoie les ingrédients du type demandé", async () => {
    (getIngredientsByTypeService as jest.Mock).mockResolvedValueOnce([
      { id: 2, nom: "muscade", type: "épice" },
    ]);

    const res = await request(app).get("/api/ingredients?type=épice");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: "ok",
      data: [{ id: 2, nom: "muscade", type: "épice" }],
    });

    expect(getIngredientsByTypeService).toHaveBeenCalledWith({ type: "épice" });
  });

  test("renvoie une erreur si type manquant", async () => {
    const res = await request(app).get("/api/ingredients");
    expect(res.status).toBe(404);
    expect(res.body.status).toBe("not found");
    expect(res.body.message).toBe("Missing type");
  });

  test("renvoie NotFoundError si pas d'ingrédients", async () => {
    (getIngredientsByTypeService as jest.Mock).mockRejectedValueOnce(
      new NotFoundError("No ingredients for type: viande")
    );

    const res = await request(app).get("/api/ingredients?type=viande");

    expect(res.status).toBe(404);
    expect(res.body.status).toBe("not found");
    expect(res.body.message).toBe("No ingredients for type: viande");
  });
});

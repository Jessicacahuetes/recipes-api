import express from "express";
import recettesRoutes from "./routes/recettesRoutes";
import ingredientsRoutes from "./routes/ingredientsRoutes";

import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "server is running",
  });
});

app.use("/api/recettes", recettesRoutes);
app.use("/api/ingredients", ingredientsRoutes);

app.use(errorHandler);

export default app;

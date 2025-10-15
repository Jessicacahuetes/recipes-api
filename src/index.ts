import app from "./app";
import { client } from "./pg-db";
import dotenv from "dotenv";

dotenv.config();

client
  .connect()
  .then(() => {
    console.log("✅ pg connected");
    app.listen(process.env.PORT, () => {
      console.log("🚀 Server started");
    });
  })
  .catch((err) => {
    console.log("❌ pg connexion error : ", err);
  });

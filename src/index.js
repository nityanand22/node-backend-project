import dotenv from "dotenv";
dotenv.config({ path: "./env" });
import express from "express";
import connectDB from "./db/index.js";

const app = express();

connectDB()
  .then(() => {
    app.on("error", (error) =>
      console.error("Error connecting to MongoDB:", error)
    );
    app.listen(3000, () => console.log("Server is running on port 3000"));
  })
  .catch((err) => {
    console.log(err);
  });

export default app;

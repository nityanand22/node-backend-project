// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
dotenv.config({ path: "./env" });
import express from "express";
import connectDB from "./db/index.js";

const app = express();

// (async () => {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
//     app.on("error", (error) =>
//       console.error("Error connecting to MongoDB:", error)
//     );
//     app.listen(3000, () => console.log("Server is running on port 3000"));
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// })();

connectDB().then(() => {
  app.on("error", (error) =>
    console.error("Error connecting to MongoDB:", error)
  );
  app.listen(3000, () => console.log("Server is running on port 3000"));
});

export default app;

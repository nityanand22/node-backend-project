import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
// jo data req me aata hai wo alag alag type ka ho skta hai to json support ke liye express.json middleware use kr rhe
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // jab data url ke through aata hai to browsers different work krte hai. wo alag alag tarike se tokeinze krte hai koi + ya %20 use krte hai spacing ke liye to uske liye urlencoded middleware use krte hai aur kabhi kabhi (rarly) wo params nested hote hai to uske liye extended key pass krte hai.
app.use(express.static("public"));
app.use(cookieParser());

export { app };

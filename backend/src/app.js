import express from "express"
import dotenv from "dotenv"
import userAuthRouter from "./routes/userauth.route.js";
import cookieParser from "cookie-parser";
import foodpartnerRouter from "./routes/foodpartnerAuth.route.js";

dotenv.config();
const app = express();
app.use(express.json())
app.use(cookieParser())

app.use("/api/user" , userAuthRouter);
app.use("/api/foodpartner", foodpartnerRouter);





export default app;

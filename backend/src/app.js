import express from "express"
import dotenv from "dotenv"
import userAuthRouter from "./routes/userauth.route.js";
import cookieParser from "cookie-parser";
import foodpartnerRouter from "./routes/foodpartnerAuth.route.js";
import cors from "cors"

dotenv.config();
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


app.use("/api/user" , userAuthRouter);
app.use("/api/foodpartner", foodpartnerRouter);





export default app;

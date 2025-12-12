import express from "express"
import { userLogin, userlogout, userRegister } from "../controllers/userauth.controller.js";
import authUser from "../middleware/authUser.js";
import { getAllFoodItems } from "../controllers/food.controller.js";
const  userAuthRouter = express.Router();

userAuthRouter.post("/userregister", userRegister);
userAuthRouter.post("/userlogin", userLogin);
userAuthRouter.get("/userlogut", userlogout);
userAuthRouter.get("/getallfoods", authUser, getAllFoodItems);


export default userAuthRouter;

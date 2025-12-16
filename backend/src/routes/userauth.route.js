import express from "express"
import { userLogin, userlogout, userRegister } from "../controllers/userauth.controller.js";
import authUser from "../middleware/authUser.js";
import { getAllComment, getAllFoodItems, getAllSaveReels, getComment, getLike, saveReel, checkSave, SearchAPI } from "../controllers/food.controller.js";
const  userAuthRouter = express.Router();

userAuthRouter.post("/userregister", userRegister);
userAuthRouter.post("/userlogin", userLogin);
userAuthRouter.get("/userlogut", userlogout);
userAuthRouter.get("/getallfoods", authUser,  getAllFoodItems);
userAuthRouter.get("/getlike/:reelId" , authUser , getLike );
userAuthRouter.post("/getcomment/:commnetId" , authUser , getComment );
userAuthRouter.get("/getallcomment/:commentId" , authUser , getAllComment );
userAuthRouter.get("/savereel/:reelId", authUser , saveReel)
userAuthRouter.get("/checksave/:reelId", authUser , checkSave)
userAuthRouter.get("/getsavereel", authUser , getAllSaveReels)
userAuthRouter.get("/searchapi", authUser , SearchAPI)

export default userAuthRouter;

import express from "express"
import { foodpartnerLogin, foodPartnerLogout, foodPartnerRegister, getFoodPartner } from "../controllers/foodpartnerauth.controller.js";
import authFoodPartner from "../middleware/authFoodPartner.js";
import { addFoodItem, getAllFoodItems } from "../controllers/food.controller.js";
import { upload } from "../middleware/multer.js";
import authUser from "../middleware/authUser.js";

const foodpartnerRouter = express.Router();


foodpartnerRouter.post("/foodpartnerregister"  , foodPartnerRegister);
foodpartnerRouter.post("/foodpartnerlogin"  , foodpartnerLogin);
foodpartnerRouter.get("/foodpartnerlogout"  , foodPartnerLogout);
foodpartnerRouter.post("/additem"  , authFoodPartner , upload.single("video")  ,addFoodItem )

foodpartnerRouter.get("/getfoodpartner/:profile" ,  getFoodPartner)



export default foodpartnerRouter;

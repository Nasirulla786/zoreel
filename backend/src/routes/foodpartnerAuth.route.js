import express from "express"
import { foodpartnerLogin, foodPartnerLogout, foodPartnerRegister, getFoodPartner, getFoodPartnerDetails, getMyStore, deleteFoodItem } from "../controllers/foodpartnerauth.controller.js";
import authFoodPartner from "../middleware/authFoodPartner.js";
import { addFoodItem } from "../controllers/food.controller.js";
import { upload } from "../middleware/multer.js";

const foodpartnerRouter = express.Router();

foodpartnerRouter.post("/foodpartnerregister"  , foodPartnerRegister);
foodpartnerRouter.post("/foodpartnerlogin"  , foodpartnerLogin);
foodpartnerRouter.get("/foodpartnerlogout"  , foodPartnerLogout);
foodpartnerRouter.post("/additem"  , authFoodPartner , upload.single("video")  ,addFoodItem )
foodpartnerRouter.get("/getfoodpartner/:profile" ,  getFoodPartner)
foodpartnerRouter.get("/getfoodpartnerdetails/:foodpartner" , getFoodPartnerDetails)
foodpartnerRouter.get("/my-store" , authFoodPartner , getMyStore)
foodpartnerRouter.delete("/item/:itemId" , authFoodPartner , deleteFoodItem)

export default foodpartnerRouter;

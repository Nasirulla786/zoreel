import jwt from "jsonwebtoken";
import FoodPartner from "../model/foodpartner.model.js";
const authFoodPartner = async(req , res , next)=>{
    try {

        const token = await req.cookies.token;
        if(!token){
            console.log("token can't find");
            return;
        }

        const decode = jwt.verify(token , process.env.JWT_SECRET);

        const fp= await FoodPartner.findById(decode.id);
        if(!fp){
            return res.status(400).json({message:"you cant add food itmes"});
        }

        req.foodpartner = fp;

        next()

    } catch (error) {
        console.log("authfoodpartner middleware error", error);

    }
}


export default authFoodPartner;

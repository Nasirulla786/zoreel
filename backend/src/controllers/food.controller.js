import Food from "../model/food.model.js";
import FoodPartner from "../model/foodpartner.model.js";
import User from "../model/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addFoodItem = async(req, res)=>{
    try {
        const foodpartnerID = req.foodpartner._id;
        const {name , description  } = req.body;
        let videoFile;

        const foodpartner = await FoodPartner.findById(foodpartnerID);
        if(!foodpartner){
            return res.status(400).json({message:"foodpartner not found..!"});
        }

        if(req.file){
             videoFile = await uploadOnCloudinary(req.file.path);
        }


        const foodItem = await Food.create({
            name,
            description,
            video:videoFile,
            foodpartner:foodpartnerID
        })

        return res.status(200).json(foodItem)




    } catch (error) {
        console.log("addfooditem error", error)

    }
}



export const getAllFoodItems = async (req , res)=>{
    try {

        const userID = req.user._id;
        const user = await User.findById(userID);
        if(!user){
            return res.status(400).json({message:"your are not authenticated..."})
        }
        const alldata = await Food.find({});
        return res.status(200).json(alldata);

    } catch (error) {
        console.log("get all items error", error);

    }
}

import bcrypt, { hash } from "bcryptjs";
import FoodPartner from "../model/foodpartner.model.js";
import Food from "../model/food.model.js";
import generateToken from "../utils/token.js";

export const foodPartnerRegister = async (req, res) => {
  try {
    const { businessName, email, password  , location , phone , outlets} = req.body;

    if (!email || !password || !businessName || !location || !phone || !outlets) {
      return res.status(400).json({ message: "Required all fiels!" });
    }

    const emailCheck = await FoodPartner.findOne({
      email,
    });

    if (emailCheck) {
      return res.status(400).json({ message: "email already exists!" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const foodpartner = await FoodPartner.create({
      businessName,
      email,
      password: hashpassword,
      location,
      phone,
      outlets
    });

    const token = generateToken(foodpartner._id);
    res.cookie("token", token);

    return res.status(200).json(foodpartner);
  } catch (error) {
    console.log("foodpartner resgister error", error);
  }
};

export const foodpartnerLogin = async (req, res) => {
  try {
    const {  email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Required all fiels!" });
    }

    const emailCheck = await FoodPartner.findOne({
      email,
    });

    if (!emailCheck) {
      return res.status(400).json({ message: "incorrect password!" });
    }

    const comaparePassword = await bcrypt.compare(password, emailCheck.password);

    if(!comaparePassword){
        return res.status(400).json({message:"incorerect password"})
    }


    const token = generateToken(emailCheck._id);
    res.cookie("token", token);

    return res.status(200).json(emailCheck);
  } catch (error) {
    console.log("foodpartner login error", error);
  }
};



export const foodPartnerLogout = async(req,res)=>{
    try {

        await res.clearCookie("token");
            res.status(200).json({message:"logout successfully"});

    } catch (error) {

        console.log("foodpartner logout error", error)

    }
}



export const getFoodPartner  = async(req , res)=>{
  try {
    const profile = req.params.profile;
    console.log(profile);
    const foodPartner = await FoodPartner.findById(profile);
    if(!foodPartner){
      console.log("food partner not found")
      return res.status(400).json({message:"FoodPArtner not found..!"});
    }

    // return the full food partner data
    return res.status(200).json(foodPartner);

  } catch (error) {
    console.log("getfoodpartner error", error);
    return res.status(500).json({message:"Error fetching food partner"});
  }
}

export const getFoodPartnerDetails = async(req , res)=>{
  try {
    const foodpartnerId = req.params.foodpartner;

    // Import Food model for the query
    const Food = require("../model/food.model.js").default;

    const foodPartner = await FoodPartner.findById(foodpartnerId);
    if(!foodPartner){
      console.log("food partner not found")
      return res.status(400).json({message:"Food Partner not found"});
    }

    // Get all food items uploaded by this food partner
    const foodItems = await Food.find({foodpartner: foodpartnerId});

    return res.status(200).json({
      ...foodPartner.toObject(),
      totalItems: foodItems.length,
      items: foodItems,
      rating: (Math.random() * 2 + 3).toFixed(1), // Placeholder rating
      reviews: Math.floor(Math.random() * 500) // Placeholder reviews
    });

  } catch (error) {
    console.log("getfoodpartnerdetails error", error);
    return res.status(500).json({message:"Error fetching food partner details"});
  }
}

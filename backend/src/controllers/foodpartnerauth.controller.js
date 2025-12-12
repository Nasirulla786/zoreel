import bcrypt, { hash } from "bcryptjs";
import FoodPartner from "../model/foodpartner.model.js";
import generateToken from "../utils/token.js";

export const foodPartnerRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
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
      name,
      email,
      password: hashpassword,
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

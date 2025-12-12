import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/token.js";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "required all fields",
      });
    }
    const alreadyEmail = await User.findOne({
      email,
    });

    if (alreadyEmail) {
      return res.status(400).json({
        message: "Email already exits",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const token = generateToken(user._id);
    if (!token) {
      return res.status(500).json({ message: "token cant access" });
    }

    res.cookie("token", token);

    return res.status(200).json(user);
  } catch (error) {
    console.log("userregister error", error);
  }
};





export const userLogin= async (req, res) => {
  try {
    const { email, password } = req.body;
    if ( !email || !password) {
      return res.status(400).json({
        message: "required all fields",
      });
    }


    const alreadyEmail = await User.findOne({
      email,
    });

    if (!alreadyEmail) {
      return res.status(400).json({
        message: "Email does not exist",
      });
    }

    const comparePassword =   await bcrypt.compare(password, alreadyEmail.password);

        if (!comparePassword) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }


    const token = generateToken(alreadyEmail._id);
    if (!token) {
      return res.status(500).json({ message: "token cant access" });
    }

    res.cookie("token", token);

    return res.status(200).json(alreadyEmail);
  } catch (error) {
    console.log("userLogin error", error);
  }
};



export const userlogout = async(req, res)=>{
    try {
        await res.clearCookie("token");
        res.status(200).json({message:"logout successfully"});

    } catch (error) {
        console.log("logout error",error)

    }
}

import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const authUser  = async (req , res , next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"you are not authenticated!"});
        }

        const decode = jwt.verify(token , process.env.JWT_SECRET);
        const user = await User.findById(decode.id);

        req.user = user;

        next();

    } catch (error) {
        console.log("user auth middleware error", error);
        return res.status(401).json({message:"Invalid or expired token"});
    }
}


export default authUser;

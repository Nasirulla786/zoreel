import mongoose from "mongoose"

const foodpartnerSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true
    },
    email :{
        type:String,
        required:true,
        unique :true,
    },
    password:{
        type:String,
        required:true
    }},{timestamps:true})


const FoodPartner = mongoose.model("FoodPartner" , foodpartnerSchema);

export default FoodPartner;

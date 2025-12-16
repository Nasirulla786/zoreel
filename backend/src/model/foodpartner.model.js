import mongoose from "mongoose"

const foodpartnerSchema = new mongoose.Schema({

    email :{
        type:String,
        required:true,
        unique :true,
    },

    businessName:{
        type:String,

    },
    outlets:{
        type:Number,
        default:0
    },
    visits:{
        type:Number,
        default:0
    },
    phone:{
        type:String,
    },
    location:{
        type:String
    },
    password:{
        type:String,
        required:true
    }},{timestamps:true})




const FoodPartner = mongoose.model("FoodPartner" , foodpartnerSchema);

export default FoodPartner;

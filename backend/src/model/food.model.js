import mongoose from "mongoose";
const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    video: {
      type: String,
      required: true,
    },
    foodpartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodPartner",
    },

    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comment: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        comment: {
          type: String,
        },
      },
    ],

    


  },
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);
export default Food;

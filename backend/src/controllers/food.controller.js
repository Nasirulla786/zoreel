import Food from "../model/food.model.js";
import FoodPartner from "../model/foodpartner.model.js";
import User from "../model/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addFoodItem = async (req, res) => {
  try {
    const foodpartnerID = req.foodpartner._id;
    const { name, description } = req.body;

    const foodpartner = await FoodPartner.findById(foodpartnerID);
    if (!foodpartner) {
      return res.status(400).json({
        message: "Food partner not found",
      });
    }

    // 🔴 Video must be present
    if (!req.file) {
      return res.status(400).json({
        message: "Video is required",
      });
    }

    // ✅ Upload on cloudinary
    const cloudinaryRes = await uploadOnCloudinary(req.file.path);

    if (!cloudinaryRes || !cloudinaryRes.secure_url) {
      return res.status(500).json({
        message: "Video upload failed",
      });
    }

    // ✅ Save only secure_url (STRING)
    const foodItem = await Food.create({
      name,
      description,
      video: cloudinaryRes.secure_url,
      foodpartner: foodpartnerID,
    });

    return res.status(201).json(foodItem);
  } catch (error) {
    console.log("addfooditem error", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getAllFoodItems = async (req, res) => {
  try {
    const userID = req.user._id;
    // const FoodPartnerID = req.foodpartner._id;
    const user = await User.findById(userID);
    if (!user) {
      return res.status(400).json({ message: "your are not authenticated..." });
    }

    // const foodpartner = await FoodPartner.findById(FoodPartnerID);

    const alldata = await Food.find({});
    // console.log(alldata);
    return res.status(200).json({
      user: user,
      data: [...alldata],
    });
  } catch (error) {
    console.log("get all items error", error);
  }
};

export const getLike = async (req, res) => {
  try {
    const reelId = req.params.reelId;
    const reel = await Food.findById(reelId);
    if (!reel) {
      return res.status(400).json({ message: "reel not found" });
    }

    const alreadyLike = reel.like.some(
      (id) => id.toString() === req.user._id.toString()
    );

    if (alreadyLike) {
      reel.like = reel.like.filter((e) => {
        e._id.toString() != req.user._id.toString();
      });
    } else {
      reel.like.push(req.user._id);
    }

    await reel.save();

    return res.json({ liked: alreadyLike, likeCount: reel.like.length });
  } catch (error) {
    console.log("like error", error);
  }
};

export const getComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const commnetId = req.params.commnetId;
    const userId = req.user._id;
    const reel = await Food.findById(commnetId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    if (!reel) {
      return res.status(400).json({ message: "reel not found" });
    }

    const commnent = reel.comment.push({
      author: userId,
      comment,
    });

    await reel.save();
    return res.json({ message: "commnet done" });
  } catch (error) {
    console.log("get commnet error", error);
  }
};

export const getAllComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const allComments = await Food.findById(commentId);
    // console.log(allComments)
    return res.status(200).json(allComments);
  } catch (error) {
    console.log("get comment error", error);
  }
};

export const saveReel = async (req, res) => {
  try {
    const reelId = req.params.reelId;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    const alreadySave = user.saveReel.includes(reelId);
    if (alreadySave) {
      user.saveReel.pull(reelId);
      await user.save();
      return res.json({
        message: "Unsaved",
        isSaved: false,
      });
    } else {
      user.saveReel.push(reelId);
      await user.save();
    }

    return res.status(200).json({ message: "saved", isSaved: true });
  } catch (error) {
    console.log("savereel error", error);
  }
};

export const checkSave = async (req, res) => {
  try {
    const reelId = req.params.reelId;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    const isSaved = user.saveReel.includes(reelId);
    return res.status(200).json({ isSaved });
  } catch (error) {
    console.log("checksave error", error);
    return res.status(500).json({ message: "error checking save status" });
  }
};

export const getAllSaveReels = async (req, res) => {
  try {
    const userID = req.user._id;

    const user = await User.findById(userID).populate({
      path: "saveReel",
      select: "name description video",
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(" get alll reels error", error);
  }
};

export const SearchAPI = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({
        message: "query Not found",
      });
    }

    const foods = await Food.find({
      name: {
        $regex: q,
        $options: "i",
      },
    });


    return res.status(200).json([...foods]);
  } catch (error) {
    console.log("search api error", error);
  }
};

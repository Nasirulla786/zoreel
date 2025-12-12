import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
const uploadOnCloudinary = async (file) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDAPI_KEY,
      api_secret: process.env.CLOUDAPI_SECRET,
    });
    const res = await cloudinary.uploader.upload(file ,  {
  resource_type: "video"
});// upload
    fs.unlinkSync(file)

    return res.secure_url;

  } catch (error) {
    console.log("cloudinary error", error);
  }
};


export default uploadOnCloudinary;

import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
import path from "path"

const uploadOnCloudinary = async (file) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDAPI_KEY,
      api_secret: process.env.CLOUDAPI_SECRET,
    });

    const res = await cloudinary.uploader.upload(file, {
      resource_type: "video"
    });

    // Delete file only if it exists
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }

    return res;

  } catch (error) {
    console.log("cloudinary error", error);
    // Try to delete file even if upload failed
    if (file && fs.existsSync(file)) {
      try {
        fs.unlinkSync(file);
      } catch (unlinkError) {
        console.log("Error deleting file:", unlinkError);
      }
    }
    throw error;
  }
};

export default uploadOnCloudinary;

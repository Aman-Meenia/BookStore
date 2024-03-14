import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

cloudinary.config({
  cloud_name: "dlvslvw2m",
  api_key: "733717417878842",
  api_secret: "98Iu5HeCT_yiZoYU3taX7W9jT5M",
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("File path not available ");
      return false;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "Library",
    });
    // console.log(response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (err) {
    console.log(err);
    console.log("Error while uploading file to cloudinary ");
    // remove the locally saved temporary file as the upload operation got failed
    fs.unlinkSync(localFilePath);
  }
};

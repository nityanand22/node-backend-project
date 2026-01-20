import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadImage = async (filePath) => {
  try {
    if (!filePath) return null;
    const res = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    return {
      public_id: res.public_id,
      secure_url: res.url,
    };
  } catch (error) {
    fs.unlinkSync(filePath); // remoe the locally saved temperary file as the upload failed
    return null;
  }
};

export const deleteImage = async (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

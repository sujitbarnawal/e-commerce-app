import { v2 as cloudinary } from "cloudinary"
const config = useRuntimeConfig()



cloudinary.config(`CLOUDINARY_URL=cloudinary://${config.cloudinaryApiKey}:${config.cloudinaryApiSecret}@dxxfezfdr`);

export const uploadImage = async (base64Image: string) => {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "online_pasal",
      resource_type: "image",
    });
    return result.secure_url;
  } catch (err) {
    console.error("Cloudinary error:", err);
    throw err;
  }
};
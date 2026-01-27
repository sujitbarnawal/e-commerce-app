import { v2 as cloudinary } from "cloudinary"


const config = useRuntimeConfig()

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
})

export const uploadImage = async (buffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "online_pasal",
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error)
        resolve(result!.secure_url)
      }
    ).end(buffer)
  })
}
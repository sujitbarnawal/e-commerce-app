import { db } from "~~/server/database";
import { products } from "~~/server/database/schema";
import { requireAdmin } from "~~/server/utils/auth";
import { uploadImage } from "~~/server/utils/cloudinary";

export default defineEventHandler(async (event) => {
  requireAdmin(event);

  const formData = await readMultipartFormData(event);
  if (!formData) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid form data",
    });
  }

  const getField = (name: string) =>
    formData.find((f) => f.name === name)?.data?.toString();

  const imageFile = formData.find((f) => f.name === "image");

  const title = getField("title");
  const description = getField("description");
  const category = getField("category");
  const price = Number(getField("price"));


  if (!title || !description || !category || !price || !imageFile) {
    throw createError({
      statusCode: 400,
      statusMessage: "All fields are required",
    });
  }

  const imageUrl = await uploadImage(imageFile.data as Buffer);

  const [newProduct] = await db.insert(products).values({
    title,
    description,
    category,
    price,
    image: imageUrl,
  }).returning();

  return {
    success: true,
    message: "Product added successfully",
    data: newProduct,
  };
});

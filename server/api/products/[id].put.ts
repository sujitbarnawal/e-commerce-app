import { eq } from "drizzle-orm";
import { db } from "~~/server/database";
import { products } from "~~/server/database/schema";
import { requireAdmin } from "~~/server/utils/auth"

export default defineEventHandler(async (event) => {
  requireAdmin(event);

  const { id } = getRouterParams(event)
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Product Id is required"
    })
  }

  const [product] = await db.select().from(products).where(eq(products.id,id))
  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not Found"
    })
  }

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
  let image_url: string | undefined

  if(imageFile?.data){
     image_url = await uploadImage(imageFile.data)
  }

  const productData = {
    title: title ?? product.title,
    description: description ?? product.description,
    price: price ?? product.price,
    category: category ?? product.category,
    image: image_url ?? product.image,
  }

  const [updatedProduct] = await db.update(products).set(productData).where(eq(products.id,id)).returning()

  return {
    success: true,
    data: updatedProduct
  }
})

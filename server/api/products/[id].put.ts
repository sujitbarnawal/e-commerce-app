import { requireAdmin } from "~~/server/utils/auth"
import { findProductById, updateProduct } from "~~/server/utils/data"

export default defineEventHandler(async (event) => {
  requireAdmin(event);

  const { id } = getRouterParams(event)
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Product Id is required"
    })
  }

  const product = findProductById(id)
  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not Found"
    })
  }

  const body = await readBody(event)
  const { title, description, price, category, image } = body

  const productData = {
    ...product, 
    title: title ?? product.title,
    description: description ?? product.description,
    price: price ?? product.price,
    category: category ?? product.category,
    image: image ?? product.image,
  }

  const updatedProduct = updateProduct(productData)

  return {
    success: true,
    data: updatedProduct
  }
})

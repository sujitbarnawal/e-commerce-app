import { requireAuth } from "~~/server/utils/auth";
import { addToCart, findProductById } from "~~/server/utils/data";

export default defineEventHandler(async (event) => {
  const auth = requireAuth(event);
  if (!auth.userId) {
    throw createError({
      statusCode: 404,
      statusMessage: "Unauthorized",
    });
  }
  const body = await readBody(event);
  const { productId } = body;
  if (!productId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Product Id is required",
    });
  }

  const product = findProductById(productId);
  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }

  const cartItem = addToCart(auth.userId,productId)
  return {
    success:true,
    data:cartItem
  }

});

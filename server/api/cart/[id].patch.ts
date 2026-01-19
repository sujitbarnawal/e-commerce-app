import { requireAuth } from "~~/server/utils/auth";
import { decreaseQuantityOfCartItem, findProductById } from "~~/server/utils/data";

export default defineEventHandler(async (event) => {
  const auth = requireAuth(event);

  if (!auth.userId) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const  body = await readBody(event);
  const {productId}=body

  if (!productId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Product ID is required",
    });
  }

  const product = findProductById(productId);
  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }

  const updated = decreaseQuantityOfCartItem(productId, auth.userId);

  if (!updated) {
    throw createError({
      statusCode: 400,
      statusMessage: "Cart update failed",
    });
  }

  return {
    success: true,
    message: "Cart updated successfully",
  };
});

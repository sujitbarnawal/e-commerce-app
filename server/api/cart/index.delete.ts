import { requireAuth } from "~~/server/utils/auth";
import { clearUserCart } from "~~/server/utils/data";

export default defineEventHandler(async (event) => {
  const auth = requireAuth(event);
  
  if (!auth.userId) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  clearUserCart(auth.userId);

  return {
    success: true,
    message: "Cart cleared successfully",
  };
});
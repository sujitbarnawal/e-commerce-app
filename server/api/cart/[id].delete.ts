import { and, eq } from "drizzle-orm";
import { db } from "~~/server/database";
import { products ,cartItems} from "~~/server/database/schema";
import { requireAuth } from "~~/server/utils/auth";
import {  removeFromCart } from "~~/server/utils/data";

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

  const product = await db.select().from(products).where(eq(products.id,productId));
  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }

  const [removed] = await db.delete(cartItems).where(and(eq(cartItems.userId,auth.userId),eq(cartItems.productId,productId))).returning()
  
  if (!removed) {
    throw createError({
      statusCode: 400,
      statusMessage: "Product not removed from cart",
    });
  }
  return {
    success: true,
    message: "Product removed from cart!",
  };
});

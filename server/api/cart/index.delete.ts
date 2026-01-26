import { db } from "~~/server/database";
import { requireAuth } from "~~/server/utils/auth";
import { cartItems } from "~~/server/database/schema";
import { eq } from "drizzle-orm";
import { clear } from "node:console";

export default defineEventHandler(async (event) => {
  const auth = requireAuth(event);
  
  if (!auth.userId) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const cleared = await db.delete(cartItems).where(eq(cartItems.userId,auth.userId)).returning()
  if(!cleared){
    throw createError({
      statusCode:400,
      statusMessage:"Cart not cleared, Error Occured!"
    })
  }

  return {
    success: true,
    message: "Cart cleared successfully",
  };
});
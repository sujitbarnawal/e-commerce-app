import { and, eq } from "drizzle-orm";
import { db } from "~~/server/database";
import { products,cartItems } from "~~/server/database/schema";
import { requireAuth } from "~~/server/utils/auth";

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

  const [product] = await db.select().from(products).where(eq(products.id,productId));
  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }

  let cartItem;

  const [existing] = await db.select().from(cartItems).where(and(eq(cartItems.productId, productId),eq(cartItems.userId, auth.userId)))
  if(existing){
    [cartItem] = await db.update(cartItems).set({quantity:existing.quantity+1}).where(and(eq(cartItems.productId, productId),eq(cartItems.userId, auth.userId))).returning()
  }else{
    [cartItem]= await db.insert(cartItems).values({
      userId:auth.userId,
      productId,
      quantity:1
    }).returning()
  }
  return {
    success:true,
    data:cartItem
  }

});

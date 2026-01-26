import { and, eq } from "drizzle-orm";
import { db } from "~~/server/database";
import { products,cartItems } from "~~/server/database/schema";
import { requireAuth } from "~~/server/utils/auth";
import {  findProductById } from "~~/server/utils/data";

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

  const [product] = await db.select().from(products).where(eq(products.id,productId));
  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }
  let updated;
  const [cartProduct] = await db.select().from(cartItems).where(and(eq(cartItems.userId,auth.userId),eq(cartItems.productId,productId)))
  if(cartProduct.quantity>1){
     [updated] = await db.update(cartItems).set({quantity:cartProduct.quantity-1}).where(and(eq(cartItems.userId,auth.userId),eq(cartItems.productId,productId))).returning()
  }else{
     [updated]= await db.delete(cartItems).where(and(eq(cartItems.userId,auth.userId),eq(cartItems.productId,productId))).returning()
  }

  if(!updated){
    throw createError({
      status:400,
      statusMessage:"Update cart failed"
    })
  }

  return {
    success: true,
    message: "Cart updated successfully",
  };
});

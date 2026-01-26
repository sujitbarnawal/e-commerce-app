import { eq, desc } from "drizzle-orm";
import { db } from "~~/server/database";
import { orders, orderItems, products } from "~~/server/database/schema";
import { requireAuth } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {

  const auth = requireAuth(event);
  if (!auth?.userId) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const userOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, auth.userId))
    .orderBy(desc(orders.createdAt));

  if (userOrders.length === 0) {
    return { success: true, data: [] };
  }

  const ordersWithItems = [];

  for (const order of userOrders) {
    const items = await db
      .select({
        id: orderItems.id,
        productId: orderItems.productId,
        quantity: orderItems.quantity,
        price: orderItems.price,
        product: {
          id: products.id,
          title: products.title,
          image: products.image,
          price: products.price,
          category: products.category,
        },
      })
      .from(orderItems)
      .innerJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, order.id));

    ordersWithItems.push({
      ...order,
      itemsWithProducts: items,
    });
  }

  return {
    success: true,
    data: ordersWithItems,
  };
});
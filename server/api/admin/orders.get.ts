import { eq, desc } from "drizzle-orm";
import { db } from "~~/server/database";
import { orders, orderItems, products, users } from "~~/server/database/schema";
import { requireAdmin, sanitizeUser } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {
  requireAdmin(event);
  const allOrders = await db
    .select()
    .from(orders)
    .orderBy(desc(orders.createdAt));

  if (allOrders.length === 0) {
    return { success: true, data: [] };
  }

  const ordersWithDetails = [];

  for (const order of allOrders) {
    let [orderUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, order.userId));
    const user: User = {
      id: orderUser.id,
      name: orderUser.name,
      email: orderUser.email,
      role: orderUser.role,
      password:orderUser.password,
      createdAt:orderUser.createdAt,
      phone: orderUser.phone || null,
      address: {
        line1: orderUser.address_line1 || null,
        line2: orderUser.address_line2 || null,
      },
    };

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

    ordersWithDetails.push({
      ...order,
      user: orderUser ? sanitizeUser(user) : null,
      itemsWithProducts: items,
    });
  }

  return {
    success: true,
    data: ordersWithDetails,
  };
});

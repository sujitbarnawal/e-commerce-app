import { db } from "~~/server/database";
import { requireAdmin } from "~~/server/utils/auth";
import {  orders, products, users } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
  requireAdmin(event);
  
  const allProducts = await db.select().from(products);
  const allOrders = await db.select().from(orders);
  const allUsers = await db.select().from(users);
  
  const totalProducts = allProducts.length;
  const totalOrders = allOrders.length;
  const totalRevenue = allOrders.reduce((sum, order) => sum + order.total!, 0);
  const totalUsers = allUsers.filter(u => u.role === 'user').length;
  
  return {
    success: true,
    data: {
      stats: {
        totalProducts,
        totalOrders,
        totalRevenue,
        totalUsers,
      },
    },
  };
});
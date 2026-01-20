import { requireAdmin, requireAuth } from "~~/server/utils/auth";
import {  orders, products, users } from "~~/server/utils/data";

export default defineEventHandler(async (event) => {
  requireAdmin(event);
  
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalUsers = users.filter(u => u.role === 'user').length;
  
 
  
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
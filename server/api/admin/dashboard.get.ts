import { requireAdmin, requireAuth } from "~~/server/utils/auth";
import { findUserById, orders, products, users } from "~~/server/utils/data";

export default defineEventHandler(async (event) => {
  const auth = requireAuth(event);
  const user = findUserById(auth.userId);
  
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    });
  }
  
  requireAdmin(event, user.role);
  
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
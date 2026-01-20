import {
  requireAdmin,
  sanitizeUser,
} from "~~/server/utils/auth";
import {
  findProductById,
  findUserById,
  getAllOrders,
} from "~~/server/utils/data";

export default defineEventHandler(async (event) => {
requireAdmin(event);


  const orders = getAllOrders();


  const ordersWithDetails = orders.map((order) => {
    const orderUser = findUserById(order.userId);

    const itemsWithProducts = order.items.map((item) => {
      const product = findProductById(item.productId);

      return {
        ...item,
        product: product || null,
      };
    });

    return {
      ...order,
      user: orderUser ? sanitizeUser(orderUser) : null,
      items: itemsWithProducts,
    };
  });

  return {
    success: true,
    data: ordersWithDetails,
  };
});

import {
  requireAdmin,
  requireAuth,
  sanitizeUser,
} from "~~/server/utils/auth";
import {
  findProductById,
  findUserById,
  getAllOrders,
} from "~~/server/utils/data";

export default defineEventHandler(async (event) => {

  const auth = requireAuth(event);

  if (!auth?.userId) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const user = findUserById(auth.userId);

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    });
  }


  requireAdmin(event, user.role);


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

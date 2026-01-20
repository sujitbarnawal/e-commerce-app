export default defineEventHandler(async (event) => {
  const auth = requireAuth(event);
  if (!auth?.userId) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const user = findUserById(auth.userId);
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not Found" });
  }

  requireAdmin(event, user.role);

  const { id } = getRouterParams(event);
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Order Id is required",
    });
  }

  const order = orders.find((o) => o.id === id);
  if (!order) {
    throw createError({ statusCode: 404, statusMessage: "Order not Found" });
  }

  const body = await readBody(event);
  const { status } = body;

  if (!status) {
    throw createError({ statusCode: 400, statusMessage: "Status is required" });
  }

  const allowedStatus = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];
  if (!allowedStatus.includes(status)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid status value",
    });
  }

  order.status = status;

  return {
    success: true,
    message: "Status updated successfully!",
    data: order,
  };
});

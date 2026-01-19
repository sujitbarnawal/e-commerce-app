import { requireAuth } from "~~/server/utils/auth";
import { clearUserCart, createOrder, findProductById, getUserCart } from "~~/server/utils/data";


export default defineEventHandler(async (event) => {
  const auth = requireAuth(event);

  if (!auth?.userId) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const body = await readBody(event);

  const { paymentMethod, shippingAddress } = body;

  if (!paymentMethod || !shippingAddress) {
    throw createError({
      statusCode: 400,
      statusMessage: "Payment method and shipping address are required",
    });
  }

  if (!["esewa", "cod"].includes(paymentMethod)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid payment method",
    });
  }

  if (
    !shippingAddress.name ||
    !shippingAddress.phone ||
    !shippingAddress.address?.line1
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid shipping address",
    });
  }

  const cartItems = getUserCart(auth.userId);

  if (cartItems.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Cart is empty",
    });
  }


  const orderItems = cartItems.map((item) => {
    const product = findProductById(item.productId);

    if (!product) {
      throw createError({
        statusCode: 404,
        statusMessage: `Product ${item.productId} not found`,
      });
    }

    return {
      productId: item.productId,
      quantity: item.quantity,
      price: product.price,
    };
  });

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = createOrder({
    userId: auth.userId,
    items: orderItems,
    total,
    status: paymentMethod === "cod" ? "processing" : "pending",
    paymentMethod,
    shippingAddress,
  });

  clearUserCart(auth.userId);

  return {
    success: true,
    data: order,
  };
});

import { eq } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  cartItems,
  products,
  orders,
  orderItems,
} from "~~/server/database/schema";
import { requireAuth } from "~~/server/utils/auth";

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
    !shippingAddress.address?.line1 ||
    !shippingAddress.address?.line2
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid shipping address",
    });
  }

  const userCartItems = await db
    .select()
    .from(cartItems)
    .where(eq(cartItems.userId, auth.userId));

  if (userCartItems.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Cart is empty",
    });
  }

  const productMap = new Map<string, any>();

  for (const item of userCartItems) {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, item.productId));

    if (!product) {
      throw createError({
        statusCode: 404,
        statusMessage: `Product ${item.productId} not found`,
      });
    }

    productMap.set(item.productId, product);
  }

  const orderItemsData = userCartItems.map((item) => {
    const product = productMap.get(item.productId);

    return {
      productId: item.productId,
      quantity: item.quantity,
      price: product.price,
    };
  });

  const total = orderItemsData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await db.transaction(async (tx) => {
    const [newOrder] = await tx
      .insert(orders)
      .values({
        userId: auth.userId,
        total,
        status: paymentMethod === "cod" ? "processing" : "pending",
        paymentMethod,
        shippingName: shippingAddress.name,
        shippingPhone: shippingAddress.phone,
        addressLine1: shippingAddress.address.line1,
        addressLine2: shippingAddress.address.line2,
      })
      .returning();

    await tx.insert(orderItems).values(
      orderItemsData.map((item) => ({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }))
    );

    await tx
      .delete(cartItems)
      .where(eq(cartItems.userId, auth.userId));

    return newOrder;
  });

  return {
    success: true,
    data: order,
  };
});
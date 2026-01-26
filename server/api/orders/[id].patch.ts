import { eq } from "drizzle-orm";
import { db } from "~~/server/database";
import { orders } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {

  requireAdmin(event);

  const { id } = getRouterParams(event);
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Order Id is required",
    });
  }
  
  const order = await db.select().from(orders).where(eq(orders.id,id));
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

  await db.update(orders).set({status:status}).where(eq(orders.id,id))

  return {
    success: true,
    message: "Status updated successfully!",
    data: order,
  };
});

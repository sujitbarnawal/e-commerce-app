import { db } from "~~/server/database";
import { requireAdmin } from "~~/server/utils/auth";
import {products} from "../../database/schema"
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  requireAdmin(event);

  const { id } = getRouterParams(event);
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Product Id is required",
    });
  }

  const [deleted] = await db.delete(products).where(eq(products.id,id)).returning();

  if (!deleted) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }

  return {
    success: true,
    message: "Product deleted successfully",
  };
});

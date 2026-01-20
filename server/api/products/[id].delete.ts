import { requireAdmin } from "~~/server/utils/auth";
import { deleteProduct } from "~~/server/utils/data";

export default defineEventHandler(async (event) => {
  requireAdmin(event);

  const { id } = getRouterParams(event);
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Product Id is required",
    });
  }

  const deleted = deleteProduct(id);

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

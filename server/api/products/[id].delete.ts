import { requireAdmin, requireAuth } from "~~/server/utils/auth";
import {
  deleteProduct,
  findUserById
} from "~~/server/utils/data";

export default defineEventHandler(async (event) => {
  const auth = requireAuth(event);

  const user = findUserById(auth.userId);
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not Found",
    });
  }

  requireAdmin(event, user.role);

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

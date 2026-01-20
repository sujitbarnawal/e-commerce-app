import {
  requireAdmin,
  requireAuth,
} from "~~/server/utils/auth";
import {
  findUserById,
  products,
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
  return{
    success:true,
    data:products
  }
});

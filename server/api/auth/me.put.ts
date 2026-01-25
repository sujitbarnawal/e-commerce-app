import { eq } from "drizzle-orm";
import { db } from "~~/server/database";
import { users } from "../../database/schema";
import { requireAuth,sanitizeUser } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {

  const auth = requireAuth(event);

  const result = await db.select().from(users).where(eq(users.id, auth.userId)).limit(1);
  const user = result[0];

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not Found!",
    });
  }

  const body = await readBody(event);
  const { name, email, phone, address } = body;

  const updateData= {
    name: name ?? user.name,
    email: email ?? user.email,
    phone: phone ? phone : user.phone,
    address_line1: address?.line1 ?? user.address_line1,
    address_line2: address?.line2 ?? user.address_line2,
  };

  const [updatedUser] = await db
    .update(users)
    .set(updateData)
    .where(eq(users.id, auth.userId))
    .returning();

  if (!updatedUser) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update user",
    });
  }

  const updatedUserResponse = {
    id:updatedUser.id,
    name:updatedUser.name,
    email:updatedUser.email,
    password:updatedUser.password,
    phone:updatedUser.phone,
    role:updatedUser.role,
    createdAt:updatedUser.createdAt,
    address:{
        line1:updatedUser.address_line1,
        line2:updatedUser.address_line2
    }
  }

  return {
    success: true,
    data: sanitizeUser(updatedUserResponse),
  };
});
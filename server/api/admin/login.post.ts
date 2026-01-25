import { eq } from "drizzle-orm";
import { db } from "~~/server/database";
import {users} from "../../database/schema"

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email and password are required!",
    });
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  const user = result[0];

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    });
  }

  if (user.password !== password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid Credentials",
    });
  }

  if (user.role !== "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Access denied - Admin only",
    });
  }

  const responseUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password, 
    role: user.role as "user"|"admin",
    phone: user.phone,
    createdAt: user.createdAt,
    address: {
      line1: user.address_line1,
      line2: user.address_line2,
    },
  };

  const token = generateToken(user.id);

  setCookie(event, "admin_token", token, {
    httpOnly: true,
    sameSite: "lax",
    // secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return {
    success: true,
    user: sanitizeUser(responseUser),
  };
});
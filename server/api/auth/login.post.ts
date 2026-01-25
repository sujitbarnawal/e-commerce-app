import { db } from "~~/server/database";
import { generateToken, sanitizeUser } from "~~/server/utils/auth";
import { users } from "../../database/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email and password are required",
    });
  }
  const result = await db.select().from(users).where(eq(users.email, email));
  const existing = result[0];
  if (!existing) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not Found!",
    });
  }
  const isValid = await bcrypt.compare(password, existing.password);
  if (!isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid Password!",
    });
  }
  if (existing.role !== "user") {
    throw createError({
      statusCode: 400,
      statusMessage: "Only users are allowed",
    });
  }
  const existingResponse = {
    id: existing.id,
    name: existing.name,
    email: existing.email,
    password: existing.password,
    phone: existing.phone,
    role: existing.role,
    address: {
      line1: existing.address_line1,
      line2: existing.address_line2,
    },
    createdAt: existing.createdAt,
  };
  const token = generateToken(existing.id);
  setCookie(event, "auth_token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return {
    success: true,
    data: {
      token,
      user: sanitizeUser(existingResponse),
    },
  };
});

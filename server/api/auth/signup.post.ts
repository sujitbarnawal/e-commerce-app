import { db } from "~~/server/database";
import { generateToken, sanitizeUser } from "~~/server/utils/auth";
import bcrypt from "bcrypt"
import {users} from "../../database/schema"
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, name, password } = body;
  if (!email || !name || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email,password and name are required",
    });
  }

  const result = await db.select().from(users).where(eq(users.email,email)).limit(1)
  const existingUser = result[0]
  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: "User already exists!",
    });
  }
  const hashedPassword = await bcrypt.hash(password,10)
  const newUserResult = await db.insert(users).values({
    name:name,
    email:email,
    password:hashedPassword
  }).returning()
  const newUser = newUserResult[0]
  const newUserResponse={
    id:newUser.id,
    name:newUser.name,
    email:newUser.email,
    password:newUser.password,
    phone:newUser.phone,
    role:newUser.role,
    address:{
      line1:newUser.address_line1,
      line2:newUser.address_line2
    },
    createdAt:newUser.createdAt
  }
  const token = generateToken(newUser.id);
   setCookie(event, 'auth_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })
  return {
    success: true,
    data: {
      user: sanitizeUser(newUserResponse),
      token,
    },
  };
});

import { generateToken, sanitizeUser } from "~~/server/utils/auth";
import { createUser, findUserByEmail } from "~~/server/utils/data";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, name, password } = body;
  if (!email || !name || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email,password and name are required",
    });
  }

  const existingUser = findUserByEmail(email);
  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: "User already exists!",
    });
  }
  const newUser = createUser({
    email,
    password,
    name,
    address: {
      line1: null,
      line2: null,
    },
    phone: null,
  });
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
      user: sanitizeUser(newUser),
      token,
    },
  };
});

import { generateToken, sanitizeUser } from "~~/server/utils/auth";
import { findUserByEmail } from "~~/server/utils/data";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email and password are required!",
    });
  }
  const user = findUserByEmail(email);
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not Found",
    });
  }
  if (!user.password === password) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });
  }
   if (user.role !== 'admin') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access denied - Admin only',
    });
  }
  const token = generateToken(user.id)
  setCookie(event, 'admin_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })
  return{
    success:true,
    data:{
        user:sanitizeUser(user),
        token
    }
  }
});

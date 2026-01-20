import { User } from "./data"
import { H3Event } from 'h3'

export const generateToken = (userId: string, role?: string): string => {
  return Buffer.from(JSON.stringify({
    userId,
    role,
    exp: Date.now() + 86400000 // 1 day
  })).toString('base64')
}


export const verifyToken = (token: string): { userId: string, role?: string } | null => {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
    if (decoded.exp < Date.now()) return null
    return { userId: decoded.userId, role: decoded.role }
  } catch {
    return null
  }
}


export const getUserFromToken = (event: H3Event): { userId: string, role?: string } | null => {
  const token = getCookie(event, 'auth_token')
  if (!token) return null
  return verifyToken(token)
}


export const getAdminFromToken = (event: H3Event): { userId: string, role?: string } | null => {
  const token = getCookie(event, 'admin_token')
  if (!token) return null
  return verifyToken(token)
}


export const requireAuth = (event: H3Event) => {
  const user = getUserFromToken(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" })
  }
  return user
}

export const requireAdmin = (event: H3Event) => {
  const admin = getAdminFromToken(event)
  if(!admin?.userId){
    throw createError("Admin not found!")
  }
  const adminUser = findUserById(admin?.userId)
  if(adminUser?.role!=='admin'){
    throw createError("Acess Forbidden")
  }
  return admin
}


export const sanitizeUser = (user: User) => {
  const { password, ...sanitized } = user
  return sanitized
}

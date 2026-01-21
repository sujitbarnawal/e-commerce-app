import { generateToken, sanitizeUser } from "~~/server/utils/auth";
import { findUserByEmail } from "~~/server/utils/data";

export default defineEventHandler(async(event)=>{
    const body = await readBody(event)
    const {email,password}=body;
    if(!email || !password){
        throw createError({
            statusCode:400,
            statusMessage:"Email and password are required"
        })
    }
    const existing=findUserByEmail(email)
    if(!existing){
        throw createError({
            statusCode:404,
            statusMessage:"User not Found!"
        })
    }
    if(existing.password!==password){
        throw createError({
            statusCode:400,
            statusMessage:"Invalid Password!"
        })
    }
    if(existing.role!=="user"){
        throw createError(
            {
                statusCode:400,
                statusMessage:"Only users are allowed"
            }
        )
    }
    const token = generateToken(existing.id)
    setCookie(event, 'auth_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })
    return {
        success:true,
        data:{
            token,
            user:sanitizeUser(existing)
        }
    }
})
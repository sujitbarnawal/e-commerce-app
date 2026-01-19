import { generateToken, sanitizeUser } from "~~/server/utils/auth";
import { findUserByEmail, findUserById } from "~~/server/utils/data";

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
    const token = generateToken(existing.id)
    return {
        success:true,
        data:{
            token,
            user:sanitizeUser(existing)
        }
    }
})
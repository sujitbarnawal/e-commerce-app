import { requireAuth, sanitizeUser } from "~~/server/utils/auth"
import {  findUserById } from "~~/server/utils/data"

export default defineEventHandler(async (event)=>{
    const auth = requireAuth(event)
    const user = findUserById(auth.userId)
    if(!user){
        throw createError({
            statusCode:404,
            statusMessage:"User not Found!"
        })
    }
    return {
        success:true,
        data:sanitizeUser(user)
    }
})
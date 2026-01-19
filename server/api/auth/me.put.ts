import { requireAuth, sanitizeUser } from "~~/server/utils/auth"
import {  findUserById, updateUser, User } from "~~/server/utils/data"

export default defineEventHandler(async (event)=>{
    const auth = requireAuth(event)
    const user = findUserById(auth.userId)
    if(!user){
        throw createError({
            statusCode:404,
            statusMessage:"User not Found!"
        })
    }
    const body = await readBody(event)
    const {name,email,phone,line1,line2}=body
    let userData = {...user,
        name:name??user.name,
        email:email??user.email,
        phone:phone??user.phone,
        address:{
            line1:line1??user.address.line1,
            line2:line2??user.address.line2,
        },
    }
    const updatedUser = updateUser(userData)
    return {
        success:true,
        data: sanitizeUser(updatedUser)
    }
    
})
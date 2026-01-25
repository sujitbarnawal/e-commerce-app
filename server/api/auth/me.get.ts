import { db } from "~~/server/database"
import {users} from "../../database/schema"
import { requireAuth, sanitizeUser } from "~~/server/utils/auth"
import { eq } from "drizzle-orm"

export default defineEventHandler(async (event)=>{
    const auth = requireAuth(event)
    const result = await db.select().from(users).where(eq(users.id,auth.userId)).limit(1)
    const user = result[0]
    const userResponse={
        id:user.id,
        name:user.name,
        email:user.email,
        password:user.password,
        role:user.role,
        phone:user.phone,
        createdAt:user.createdAt,
        address:{
            line1:user.address_line1,
            line2:user.address_line2
        }
    }
    if(!user){
        throw createError({
            statusCode:404,
            statusMessage:"User not Found!"
        })
    }
    return {
        success:true,
        data:sanitizeUser(userResponse)
    }
})
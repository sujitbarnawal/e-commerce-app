import { requireAdmin, requireAuth } from "~~/server/utils/auth"
import { createProduct, findUserById } from "~~/server/utils/data"

export default defineEventHandler(async(event)=>{
    const auth = requireAuth(event)
    const user = findUserById(auth.userId)
    if(!user){
        throw createError({
            statusCode:404,
            statusMessage:"User not Found"
        })
    }
    requireAdmin(event,user.role)
    const body = await readBody(event)
    const {title,description,category,image,price}=body
    const newProduct = createProduct({
        title,
        description,
        category,
        image,
        price,
        rating:{
            count:0,
            rate:0
        }
    })
    return {
        success:true,
        data:newProduct
    }

    
})
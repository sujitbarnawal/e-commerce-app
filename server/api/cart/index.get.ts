import { eq } from "drizzle-orm"
import { db } from "~~/server/database"
import { cartItems } from "~~/server/database/schema"
import { requireAuth } from "~~/server/utils/auth"
import { findProductById } from "~~/server/utils/data"

export default defineEventHandler(async(event)=>{
    const auth = requireAuth(event)
    if(!auth.userId){
        throw createError({
            statusCode:404,
            statusMessage:"Unauthorized"
        })
    }
    // const cartItems = getUserCart(auth.userId)
    const userCartItems = await db.select().from(cartItems).where(eq(cartItems.userId,auth.userId))
    const cartWithProducts = userCartItems.map((item)=>{
        const product = findProductById(item.productId)
        return {
            ...item,
            product
        }
    })

    const total = cartWithProducts.reduce((sum,item)=>{
        return sum+item.quantity*(item.product?.price||0)
    },0)
    return{
        success:true,
        data:{
            items:cartWithProducts,
            total
        }
    }
})
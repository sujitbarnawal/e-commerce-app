import { requireAuth } from "~~/server/utils/auth"
import { findProductById, getUserOrders } from "~~/server/utils/data"

export default defineEventHandler(async(event)=>{
    const auth = requireAuth(event)
    if(!auth.userId){
        throw createError({
            statusCode:404,
            statusMessage:"Unauthorized"
        })
    }
    const userOrders = getUserOrders(auth.userId)
    const userOrdersWithProducts=userOrders.map((order)=>{
        const itemsWithProducts=order.items.map((item)=>{
            const product=findProductById(item.productId)
            return{
                ...item,
                product
            }
        })
        return {
            ...order,
            itemsWithProducts
        }

    })
    return{
        success:true,
        data:userOrdersWithProducts
    }
})
import { requireAuth } from "~~/server/utils/auth"
import { findProductById, getUserCart } from "~~/server/utils/data"

export default defineEventHandler(async(event)=>{
    const auth = requireAuth(event)
    if(!auth.userId){
        throw createError({
            statusCode:404,
            statusMessage:"Unauthorized"
        })
    }
    const cartItems = getUserCart(auth.userId)
    const cartWithProducts = cartItems.map((item)=>{
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
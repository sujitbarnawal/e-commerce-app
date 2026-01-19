
import { findProductById } from "~~/server/utils/data"

export default defineEventHandler(async(event)=>{
    const {id} = getRouterParams(event)
    if(!id){
        throw createError({
            statusCode:400,
            statusMessage:"ProductId is required"
        })
    }
    const product = findProductById(id)
    if(!product){
        throw createError({
            statusCode:404,
            statusMessage:"Product not Found"
        })
    }

    return {
        success:true,
        data:product
    }
    
})
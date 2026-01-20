import { requireAdmin } from "~~/server/utils/auth"
import { createProduct } from "~~/server/utils/data"

export default defineEventHandler(async(event)=>{
    requireAdmin(event);
    const body = await readBody(event)
    const {title,description,category,image,price}=body
    if(!title||!description||!category||!image||!price){
        throw createError({
            statusCode:400,
            statusMessage:"All fields are required"
        })
    }
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
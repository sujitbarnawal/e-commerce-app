
import { db } from "~~/server/database"
import {products} from "../../database/schema"
import { eq } from "drizzle-orm"
export default defineEventHandler(async(event)=>{
    const {id} = getRouterParams(event)
    if(!id){
        throw createError({
            statusCode:400,
            statusMessage:"ProductId is required"
        })
    }
    const [product] = await db.select().from(products).where(eq(products.id,id))
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
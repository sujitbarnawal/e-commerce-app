import { db } from "~~/server/database";
import { products } from "~~/server/database/schema";
import {
  requireAdmin,
} from "~~/server/utils/auth";


export default defineEventHandler(async (event) => {

  requireAdmin(event);
  const allProducts = await db.select().from(products)
  return{
    success:true,
    data:allProducts
  }
});

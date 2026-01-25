import { db } from "~~/server/database";
import { products } from "~~/server/database/schema";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let filteredProducts = await db.select().from(products);
  if (query.category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === query.category,
    );
  }
  if (query.search) {
    const searchItem = String(query.search).toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(searchItem) ||
        p.description.toLowerCase().includes(searchItem),
    );
  }
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const startIndex = (page-1)*limit
  const lastIndex = startIndex + limit

  const paginatedProducts = filteredProducts.slice(startIndex,lastIndex)
  return {
    success:true,
    data:paginatedProducts,
    pagination:{
        total:filteredProducts.length,
        page,
        limit,
        totalPages:Math.ceil(filteredProducts.length/limit)
    }
  }
});

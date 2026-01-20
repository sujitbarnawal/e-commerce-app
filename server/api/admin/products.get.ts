import {
  requireAdmin,
} from "~~/server/utils/auth";
import {
  products,
} from "~~/server/utils/data";

export default defineEventHandler(async (event) => {

  requireAdmin(event);
  return{
    success:true,
    data:products
  }
});

import type {Product, CartProduct } from "~/types/ProductType"

export const useCart=()=>{
    const cart= useState<CartProduct[]>('cart',()=>[])
     
    const addToCart=(item:Product)=>{
        const existingItem = cart.value.find((c)=>c.id===item.id)
        if(existingItem){
                existingItem.quantity++
        }else{
            cart.value.push({...item,quantity:1})
        }

    }

    const removeFromCart=(id:number)=>{
        cart.value=cart.value.filter((c)=>c.id!==id)
    }

    const cartCount = computed(()=>
        cart.value.reduce((total,item)=>total+(item.quantity||1),0)
    )

    const cartTotal = computed(()=>
        cart.value.reduce((total,item)=>total+(item.quantity*Number(item.price)),0)
    
    )

    return {cart,addToCart,removeFromCart,cartCount,cartTotal}
}
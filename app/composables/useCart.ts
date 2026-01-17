import type { Product, CartProduct } from "~/types/ProductType"

export const useCart = () => {
    const { user } = useAuth()
    
    const cartKey = computed(() => 
        user.value ? `cart_${user.value.email}` : 'guest_cart'
    )

    const cartCookie = useCookie<CartProduct[]>(cartKey.value, {
        default: () => [],
        watch: true
    })

    const cart = useState<CartProduct[]>('cart_state', () => cartCookie.value)

  
    watch(cartKey, (newKey) => {
        const newCookie = useCookie<CartProduct[]>(newKey)
        cart.value = newCookie.value || []
    }, { immediate: true })

    watch(cart, (newCartValue) => {
        cartCookie.value = newCartValue
    }, { deep: true })

    const addToCart = (item: Product) => {
        const existingItem = cart.value.find((c) => c.id === item.id)
        if (existingItem) {
            existingItem.quantity++
        } else {
            cart.value.push({ ...item, quantity: 1 })
        }
    }

    const removeFromCart = (id: number) => {
        cart.value = cart.value.filter((c) => c.id !== id)
    }

    const removeOneFromCart = (id: number) => {
    const index= cart.value.findIndex(c => c.id === id);
    if (index === -1) return;

    cart.value[index]!.quantity > 1
      ? cart.value[index]!.quantity--
      : cart.value.splice(index, 1);
  };

    const cartCount = computed(() =>
        cart.value.reduce((total, item) => total + (item.quantity || 1), 0)
    )

    const cartTotal = computed(() =>
        cart.value.reduce((total, item) => total + (item.quantity * Number(item.price)), 0)
    )

    return { cart, addToCart, removeFromCart,removeOneFromCart, cartCount, cartTotal }
}
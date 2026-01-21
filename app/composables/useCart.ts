
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
}

export interface CartProduct extends Product {
  quantity: number;
}

export const useCart = () => {
    const { user } = useAuth()
    const token = useCookie("auth_token")
    
    const cartKey = computed(() => 
        user.value ? `cart_${user.value.email + token.value}` : 'guest_cart'
    )

    const cartCookie = useCookie<CartProduct[]>(cartKey.value, {
        default: () => [],
        watch: true
    })

    const cart = useState<CartProduct[]>('cart_state', () => cartCookie.value)
    const loading = useState('cart_loading', () => false)
    const error = useState<string | null>('cart_error', () => null)


    watch(cartKey, (newKey) => {
        const newCookie = useCookie<CartProduct[]>(newKey)
        cart.value = newCookie.value || []
    }, { immediate: true })

    watch(cart, (newCartValue) => {
        cartCookie.value = newCartValue
    }, { deep: true })


    const fetchCart = async () => {
        if (!user.value) return

        loading.value = true
        error.value = null

        try {
            const response = await $fetch('/api/cart', {
                method: 'GET'
            })

            if (response.success && response.data) {
                cart.value = response.data.items.map((item: any) => ({
                    ...item.product,
                    quantity: item.quantity 
                })) as CartProduct[]
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch cart'
            console.error('Error fetching cart:', err)
        } finally {
            loading.value = false
        }
    }


    const addToCart = async (item: Product) => {
        
        if (!user.value) {
            const existingItem = cart.value.find((c) => c.id === item.id)
            if (existingItem) {
                existingItem.quantity++
            } else {
                cart.value.push({ ...item, quantity: 1 })
            }
            return
        }

        loading.value = true
        error.value = null

        try {
            const response = await $fetch('/api/cart', {
                method: 'POST',
                body: {
                    productId: item.id
                }
            })

            if (response.success) {
                const existingItem = cart.value.find((c) => c.id === item.id)
                if (existingItem) {
                    existingItem.quantity++
                } else {
                    cart.value.push({ ...item, quantity: 1 })
                }
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to add item to cart'
            console.error('Error adding to cart:', err)
        } finally {
            loading.value = false
        }
    }


    const removeFromCart = async (id: string) => {

        if (!user.value) {
            cart.value = cart.value.filter((c) => c.id !== id)
            return
        }

        loading.value = true
        error.value = null

        try {
            const response = await $fetch(`/api/cart/${id}`, {
                method: 'DELETE',
                body: {
                    productId: id
                }
            })

            if (response.success) {
                cart.value = cart.value.filter((c) => c.id !== id)
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to remove item from cart'
            console.error('Error removing from cart:', err)
        } finally {
            loading.value = false
        }
    }

    const removeOneFromCart = async (id: string) => {
        const index = cart.value.findIndex(c => c.id === id)
        if (index === -1) return

        if (!user.value) {
            if (cart.value[index]!.quantity > 1) {
                cart.value[index]!.quantity--
            } else {
                cart.value.splice(index, 1)
            }
            return
        }
        loading.value = true
        error.value = null

        try {
            const response = await $fetch(`/api/cart/${id}`, {
                method: 'PATCH',
                body: {
                    productId: id
                }
            })

            if (response.success) {
                if (cart.value[index]!.quantity > 1) {
                    cart.value[index]!.quantity--
                } else {
                    cart.value.splice(index, 1)
                }
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to update cart'
            console.error('Error updating cart:', err)
        } finally {
            loading.value = false
        }
    }

    const clearCart = async () => {
        if (!user.value) {
            cart.value = []
            return
        }

        loading.value = true
        error.value = null

        try {
            const response = await $fetch('/api/cart', {
                method: 'DELETE'
            })
            
            if (response.success) {
                cart.value = []
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to clear cart'
            console.error('Error clearing cart:', err)
            cart.value = []
        } finally {
            loading.value = false
        }
    }

 
    const cartCount = computed(() =>
        cart.value.reduce((total, item) => total + (item.quantity || 1), 0)
    )

    const cartTotal = computed(() =>
        cart.value.reduce((total, item) => total + (item.quantity * Number(item.price)), 0)
    )

    const isEmpty = computed(() => cart.value.length === 0)

    return {
        cart,
        loading,
        error,
        fetchCart,
        addToCart,
        removeFromCart,
        removeOneFromCart,
        clearCart,
        cartCount,
        cartTotal,
        isEmpty
    }
}
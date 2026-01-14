<script setup lang="ts">
useSeo('Cart', 'Your Saved Products')
definePageMeta({
    middleware:'auth'
})

const { cart, addToCart, removeFromCart, cartTotal, cartCount } = useCart()



</script>
<template>
    <section class="max-w-7xl mx-auto pb-20 px-4">
        <h1 class="text-center text-4xl font-bold mt-4 text-blue-600 ">Your Cart</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 ">
            <div v-for="c in cart" :key="c.id" class="bg-white hover:shadow-md transition-shadow rounded-xl px-4">
                <img :src="c.image" class="w-full cursor-pointer h-[200px] bg-cover rounded-xl rounded-b-none "
                    alt="cart_product_image">
                <div class="p-4">
                    <p class="text-xl font-semibold">{{ c.title }}</p>
                    <p class="text-lg">Price: Rs.{{ c.price }}</p>
                    <p class="text-lg">Quantity: {{ c.quantity }}</p>

                </div>
                <button @click="addToCart(c)"
                    class="bg-blue-600 hover:bg-blue-700 transition-colors text-xl text-white mb-4 px-4 py-2 rounded-lg w-full">
                    Add more
                </button>
                <button @click="removeFromCart(c.id)"
                    class="bg-red-600 hover:bg-red-700 transition-colors text-xl text-white px-4 py-2 rounded-lg w-full">
                    Remove From Cart
                </button>
            </div>

        </div>
        <div v-if="cart.length > 0"
            class="flex flex-col md:flex-row items-center md:justify-between max-md:gap-4 bg-white mt-4 p-5 ">
            <div class="flex flex-col">
                <p class="text-2xl font-semibold">Total Items: {{ cartCount }}</p>
                <p class="text-2xl font-semibold">Total: Rs.{{ cartTotal.toFixed() }}</p>
            </div>
            <button @click="navigateTo('/checkout')"
                class="bg-blue-600 hover:bg-blue-700 transition-colors text-xl text-white mb-4 px-4 py-2 rounded-lg max-sm:w-full">
                Proceed To Checkout
            </button>

        </div>
    </section>
</template>
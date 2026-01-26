<script setup lang="ts">
useSeo('Cart', 'Your Saved Products')
definePageMeta({
    middleware: 'auth'
})

const { cart, addToCart, removeFromCart, removeOneFromCart, cartTotal, cartCount } = useCart()



</script>
<template>
    <section class="max-w-7xl mx-auto pb-20 px-4">
        <h1 class="text-center text-4xl font-bold mt-4 text-blue-600 ">Your Cart</h1>
        <div v-if="cart.length <= 0" class="text-3xl font-semibold flex flex-col">
            <p>Your Cart is Empty</p> <button @click="navigateTo('/products')"
                class="text-sm bg-blue-600 text-white px-3 py-2 mt-4 rounded-lg w-[150px]">View Catalog</button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 ">
            <div v-for="c in cart" :key="c.id" class="bg-white hover:shadow-md transition-shadow rounded-xl bg-cover">
                <img :src="c.image" class="w-full cursor-pointer h-[200px] bg-cover rounded-xl rounded-b-none "
                    alt="cart_product_image">
                <div class="p-4">
                    <p class="text-xl font-semibold line-clamp-2 min-h-[3.5rem]">{{ c.title }}</p>
                    <p class="text-lg">Price: Rs.{{ c.price }}</p>
                    <p class="text-lg">Quantity: {{ c.quantity }}</p>

                </div>
                <div class="flex items-center justify-between gap-3 px-3 py-2 rounded-xl w-full">
                    <button @click="removeOneFromCart(c.id)" class="flex items-center justify-center w-8 h-8 rounded-lg
               bg-red-500 hover:bg-red-600 text-white text-lg font-bold
               transition-all duration-200 active:scale-95">
                        −
                    </button>
                    <p class="text-lg font-semibold text-gray-800 w-6 text-center">
                        {{ c.quantity }}
                    </p>

                    <button @click="addToCart(c)" class="flex items-center justify-center w-8 h-8 rounded-lg
               bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold
               transition-all duration-200 active:scale-95">
                        +
                    </button>
                </div>


                <button @click="removeFromCart(c.id)"
                    class=" hover:text-red-700 transition-colors text-sm text-left text-red-400 underline px-4 py-2 rounded-lg w-full">
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
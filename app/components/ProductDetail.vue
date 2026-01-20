<script setup lang="ts">
import type { Product } from '~/types/ProductType';

const props = defineProps<{
    product: Product
}>()

const isAdded = ref(false)

const { addToCart } = useCart()

const handleAddToCart = () => {
    addToCart(props.product)
    isAdded.value = true
    setTimeout(() => isAdded.value = false, 2000)
}

useSeo(props.product.title, 'Details of specific product')
</script>

<template>
    <div class="">
        <h1 class="text-center text-4xl font-bold mb-10 mt-4 text-blue-600">{{ product.title }}</h1>
        <div class="flex  flex-col lg:flex-row  gap-4">

            <img class="max-lg:mx-auto" :src="product.image" alt="product_image">
            <div class="pt-20 flex flex-col">
                <p class="text-2xl font-semibold">{{ product.description }}</p>
                <p class="mt-4 text-2xl font-semibold">Category: <span class="text-gray-600 font-light">{{
                        product.category }}</span></p>
                <p class="mt-2 text-2xl font-semibold">Price:<span class="text-gray-600 font-light"> Rs.{{ product.price
                        }}</span></p>
                <p class="mt-2 text-2xl font-semibold">Ratings: <span class="text-gray-600 font-light"> {{
                        product.rating.count }}</span></p>
                <div class="flex mt-2 text-4xl">
                    <span v-for="i in 5" :class="i <= product.rating.rate ? 'text-yellow-400' : ''">★</span>
                </div>
                <button @click="handleAddToCart" :class="isAdded ? 'bg-green-600' : 'bg-blue-600'"
                    class=" hover:bg-blue-700 transition-colors text-xl text-white px-4 py-2 rounded-lg w-full md:w-1/2 mt-4">
                    {{ isAdded ? "Added" : "Add To Cart" }}
                </button>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import type { Product } from '~/types/ProductType';

const props = defineProps<{
    product: Product
}>()



</script>

<template>
    <div class="bg-white hover:shadow-md transition-shadow rounded-xl">
        <img :src="product.image" class="w-full h-[200px] bg-cover rounded-xl rounded-b-none " alt="product_image">
        <div class="p-4">
            <p class="text-xl font-semibold">{{ product.title }}</p>
            <p class="text-lg">Price: Rs.{{ product.price }}</p>
            <p class="text-lg">Ratings: {{ product.rating.count }}</p>
            <div class="flex  mb-4">
                <span v-for="i in 5" :key="i" :class="i <= product.rating.rate ? 'text-yellow-400' : ''">★</span>
            </div>
            <button class="bg-blue-600 hover:bg-blue-700 transition-colors text-xl text-white px-4 py-2 rounded-lg w-full">Add to Cart</button>

        </div>

    </div>

</template>
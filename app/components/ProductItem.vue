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

</script>

<template>
    <div class="bg-white hover:shadow-md transition-shadow rounded-xl">
        <img @click="navigateTo(`/product/${product.id}`)" :src="product.image" class="w-full cursor-pointer h-[200px] bg-cover rounded-xl rounded-b-none " alt="product_image">
        <div class="p-4">
            <p class="text-xl font-semibold line-clamp-2 min-h-[3.5rem]">{{ product.title }}</p>
            <p class="text-lg">Price: Rs.{{ product.price }}</p>
            <p class="text-lg">Ratings: {{ product.rating_count }}</p>
            <div class="flex mb-4">
                <span v-for="i in 5" :key="i" :class="i <= product.rating_rate! ? 'text-yellow-400' : ''">★</span>
            </div>
            <button @click="handleAddToCart"
                :class="isAdded?'bg-green-600':'bg-blue-600'"
                class="hover:bg-blue-700 transition-colors text-xl text-white px-4 py-2 rounded-lg w-full">
                {{ isAdded?"Added":"Add To Cart" }}
            </button>
        </div>
    </div>
</template>
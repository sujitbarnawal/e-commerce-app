<script setup lang="ts">
import type { Product } from '~/types/ProductType';


const products = ref<Product[]>([
    {
        id: 1,
        title: "Classic White Sneakers",
        price: "85.00",
        description: "Minimalist leather sneakers perfect for everyday wear.",
        category: "men's clothing",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400",
        rating: { rate: 4.5, count: 120 }
    },
    {
        id: 2,
        title: "Gold Petite Ring",
        price: "150.00",
        description: "14k solid gold ring with a delicate polished finish.",
        category: "jewellery",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400",
        rating: { rate: 4.8, count: 45 }
    },
    {
        id: 3,
        title: "Wireless Noise Cancelling Headphones",
        price: "299.00",
        description: "Premium sound quality with active noise cancellation features.",
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400",
        rating: { rate: 4.7, count: 890 }
    },
    {
        id: 4,
        title: "Summer Floral Dress",
        price: "45.99",
        description: "Lightweight breathable cotton dress for sunny days.",
        category: "women's clothing",
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=400",
        rating: { rate: 4.2, count: 210 }
    },
    {
        id: 5,
        title: "Minimalist Desk Lamp",
        price: "35.50",
        description: "Adjustable LED lamp with three color modes.",
        category: "others",
        image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=400",
        rating: { rate: 4.4, count: 75 }
    }
])
definePageMeta({
    layout: 'admin-layout'
})
useSeo('Products', 'Addd products here')
</script>

<template>
    <section class="md:p-6  ">
        <button @click="navigateTo('/admin/add-product')"
            class="px-4 py-2 text-white rounded-lg text-xl font-bold bg-blue-600">Add Product</button>
        <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            <div v-for="product in products" :key="product.id" class="bg-white hover:shadow-md transition-shadow rounded-xl">
                <img @click="navigateTo(`/product/${product.id}`)" :src="product.image"
                    class="w-full cursor-pointer h-[200px] bg-cover rounded-xl rounded-b-none " alt="product_image">
                <div class="p-4">
                    <p class="text-xl font-semibold">{{ product.title }}</p>
                    <p class="text-lg">Price: Rs.{{ product.price }}</p>
                    <p class="text-lg">Category: {{ product.category }}</p>
                    <p class="text-lg mt-2 font-semibold"> {{ product.description }}</p>

                </div>

            </div>
        </div>
    </section>
</template>

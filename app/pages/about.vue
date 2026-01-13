<script setup lang="ts">
import saurav_img from "../assets/images/saurav.jpeg"
import ganesh_img from "../assets/images/ganesh.jpeg"
import roman_img from "../assets/images/roman.jpeg"

const stats = [
    { label: 'Happy Customers', value: '10K+' },
    { label: 'Products Delivered', value: '50K+' },
    { label: 'Districts Covered', value: '25' },
    { label: 'Years in Service', value: '2+' },
];



const reviews = [
    {
        id: 1,
        name: "Ganesh Acharya",
        role: "Verified Buyer",
        comment: "The delivery was surprisingly fast to Pokhara. Quality is top-notch!",
        rating: 5,
        avatar: ganesh_img
    },
    {
        id: 2,
        name: "Saurav Aryal",
        role: "Fashion Enthusiast",
        comment: "Found exactly what I needed for the wedding season. Highly recommend!",
        rating: 5,
        avatar: saurav_img
    },
    {
        id: 3,
        name: "Roman Chhatkuli",
        role: "Regular Customer",
        comment: "Best customer support I have experienced in Nepal. Very helpful team.",
        rating: 4,
        avatar: roman_img
    }
];
</script>

<template>
    <div class="bg-white">
        <section class="py-20 bg-[aliceblue]">
            <div class="max-w-6xl mx-auto px-6 text-center">
                <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                    Connecting Nepal to <span class="text-blue-600">Quality Products</span>
                </h1>
                <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Started in 2024, our mission is to make online shopping accessible, reliable, and affordable for
                    every Nepali household. We bridge the gap between local artisans and modern consumers.
                </p>
            </div>
        </section>

        <section class="py-16">
            <div class="max-w-6xl mx-auto px-6">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div v-for="stat in stats" :key="stat.label" class="p-6">
                        <p class="text-4xl font-bold text-blue-600 mb-2">{{ stat.value }}</p>
                        <p class="text-gray-500 font-medium">{{ stat.label }}</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-20 bg-gray-50">
            <div class="max-w-6xl mx-auto px-6">
                <h2 class="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>

                <div class="grid md:grid-cols-3 gap-8">
                    <div v-for="review in reviews" :key="review.id"
                        class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">

                        <div class="flex  mb-4">
                            <span v-for="i in 5" :key="i" :class="i <= review.rating ? 'text-yellow-400' : ''">★</span>
                        </div>

                        <p class="text-gray-600 italic mb-6">"{{ review.comment }}"</p>

                        <div class="flex items-center gap-4">
                            <img :src="review.avatar" class="w-12 h-12 rounded-full border " alt="Avatar">
                            <div>
                                <h4 class="font-bold text-gray-900 text-sm">{{ review.name }}</h4>
                                <p class="text-gray-500 text-xs">{{ review.role }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-20 text-center">
            <h2 class="text-3xl font-bold mb-6">Ready to start shopping?</h2>
            <NuxtLink to="/products"
                class="bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition-transform hover:scale-105 inline-block">
                Browse Catalog
            </NuxtLink>
        </section>
    </div>
</template>
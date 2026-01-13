<script setup lang="ts">
import ProductDetail from '~/components/ProductDetail.vue';
import type { Product } from '~/types/ProductType';

const route=useRoute()


const {data:product,pending,error}=await useFetch<Product>(`https://fakestoreapi.com/products/${route.params.id}`,{
    key:`product-${route.params.id}`
})

console.log(product)

</script>

<template>
    <section class="pb-20">
        
        <div class="max-w-7xl mx-auto px-4 ">
            
            
            <div v-if="pending" class="flex justify-center">
                <p class="text-xl animate-pulse">Loading  product...</p>
            </div>

            <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>Error loading products: {{ error.statusMessage || 'Something went wrong' }}</p>
            </div>

            <ProductDetail 
                v-else-if="product" 
                :product="product"
            />

            <div v-else class="text-center">
                <p>No product found.</p>
            </div>

        </div>
    </section>

</template>
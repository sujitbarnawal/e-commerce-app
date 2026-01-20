<script setup lang="ts">
import type { Product } from '~/types/ProductType';



useSeo('Products', 'Explore our products and shop now');
definePageMeta({
    middleware:'auth'
})

const { data, pending, error } = await useFetch<{data:Product[]}>('/api/products',{
    method:'GET'
});
</script>

<template>
    <section class="pb-20">
        
        <div class="max-w-7xl mx-auto px-4 ">
            <h1 class="text-center text-4xl font-bold mb-10 mt-4 text-blue-600">Our Collection</h1>
            
            <div v-if="pending" class="flex justify-center">
                <p class="text-xl animate-pulse">Loading  products...</p>
            </div>

            <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>Error loading products: {{ error.statusMessage || 'Something went wrong'}}</p>
            </div>

            <ProductList 
                v-else-if="data?.data" 
                :products="data?.data"
            />

            <div v-else class="text-center">
                <p>No products found.</p>
            </div>

        </div>
    </section>
</template>
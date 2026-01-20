<script setup lang="ts">

definePageMeta({
    layout: 'admin-layout',
    middleware:'admin-auth'
})
useSeo('Products', 'Addd products here')
const {data,pending,error}=await useFetch('/api/admin/products',{
    method:'get',
    credentials:'include'
})
</script>

<template>
    <section class="md:p-6  ">
        <button @click="navigateTo('/admin/add-product')"
            class="px-4 py-2 text-white rounded-lg text-xl font-bold bg-blue-600">Add Product</button>
        <div class="text-2xl mt-2 font-semibold" v-if="pending">Loading.....</div>    
        <div class="text-2xl mt-2 font-semibold" v-else-if="error">Error Occured</div>    
        <div v-else class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            <div v-for="product in data?.data" :key="product.id" class="bg-white hover:shadow-md transition-shadow rounded-xl">
                <img @click="navigateTo(`/admin/product/${product.id}`)" :src="product.image"
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

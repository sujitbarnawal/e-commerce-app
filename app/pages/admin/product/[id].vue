<script setup lang="ts">

definePageMeta({
    layout: 'admin-layout',
    middleware: 'admin-auth'
})
const route= useRoute()
const id=route.params.id
useSeo('Products', 'Addd products here')
const { data, pending, error } = await useFetch(`/api/products/${id}`, {
    method: 'get',
    credentials: 'include'
})
</script>
<template>
    <div class="">
        <div class="text-2xl" v-if="pending">Loading.....</div>
        <div class="text-2xl" v-else-if="error">Error Occured</div>
        <div v-else>
            <h1 class="text-center text-4xl font-bold mb-10 mt-4 text-blue-600">{{ data?.data.title }}</h1>
            <div class="flex  flex-col lg:flex-row items-start gap-4">

                <img class="max-lg:mx-auto" :src="data?.data.image" alt="product_image">
                <div class="pt-20 flex flex-col">
                    <p class="text-2xl font-semibold">{{ data?.data.description }}</p>
                    <p class="mt-4 text-2xl font-semibold">Category: <span class="text-gray-600 font-light">{{
                        data?.data.category }}</span></p>
                    <p class="mt-2 text-2xl font-semibold">Price:<span class="text-gray-600 font-light"> Rs.{{
                        data?.data.price
                            }}</span></p>
                    <p class="mt-2 text-2xl font-semibold">Ratings: <span class="text-gray-600 font-light"> {{
                        data?.data.rating.count }}</span></p>
                    <div class="flex mt-2 text-4xl">
                        <span v-for="i in 5" :class="i <= data?.data.rating.rate! ? 'text-yellow-400' : ''">★</span>
                    </div>
                </div>
            </div>

        </div>

    </div>

</template>
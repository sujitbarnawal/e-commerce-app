<script setup lang="ts">

definePageMeta({
    layout: 'admin-layout',
    middleware: 'admin-auth'
})
const route = useRoute()
const id = route.params.id

const { data, pending, error } = await useFetch(`/api/products/${id}`, {
    method: 'get',
    credentials: 'include'
})
useSeo(data.value?.data.title!, 'Your Product description')
const deleteProduct = async () => {
    try {
        const res = await $fetch(`/api/products/${id}`, {
            credentials: 'include',
            method: 'DELETE'
        })
        if(res.success){
            alert(res.message)
            navigateTo('/admin/products')
        }else{
            alert('Error occured')
        }

    } catch (error) {
        console.log(error)

    }

}
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
            <div class="flex-row  flex mt-2 gap-4">
                <button @click="navigateTo(`/admin/product/update/${data?.data.id}`)"
                    class="px-4 py-2 text-white rounded-lg text-xl font-bold bg-blue-600">Edit</button>
                <button @click="deleteProduct"
                    class="px-4 py-2 text-white rounded-lg text-xl font-bold bg-red-600">Delete</button>
            </div>

        </div>

    </div>

</template>
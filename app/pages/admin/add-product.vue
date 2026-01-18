<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
    layout: 'admin-layout',
    middleware:'admin-auth'
})
useSeo('Add-product', "Add the new products here")


const defaultImg = "https://placehold.co/200x200?text=No+Image"
const imageUrl = ref(defaultImg)
const fileInput = ref<HTMLInputElement | null>(null)

const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    
    if (file) {
        imageUrl.value = URL.createObjectURL(file) 
    }
}


const removeImage = () => {
    imageUrl.value = defaultImg
    if (fileInput.value) fileInput.value.value = ''
}
</script>

<template>
    <div class="p-0 md:p-6 min-h-screen max-w-4xl">
        <h1 class="text-2xl font-bold text-blue-600 mb-4">Add Product</h1>
        
        <form class="bg-white rounded-lg p-5 w-full shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div class="flex flex-col items-center justify-center gap-4 p-6 border rounded-lg bg-gray-50">
                <label class="block text-sm font-medium text-gray-700">Product Image</label>

                <div class="relative w-48 h-48 overflow-hidden bg-white border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center">
                    <img :src="imageUrl" alt="Preview" class="object-cover w-full h-full">
                </div>

                <div class="flex flex-col items-center gap-2">
                    <label class="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-lg transition-colors">
                        <span>Select File</span>
                        <input 
                            type="file" 
                            ref="fileInput"
                            @change="onFileChange" 
                            accept="image/*" 
                            class="hidden"
                        >
                    </label>

                    <button 
                        v-if="imageUrl !== defaultImg"
                        @click="removeImage" 
                        type="button" 
                        class="text-xs text-red-500 hover:underline"
                    >
                        Remove image
                    </button>
                </div>
            </div>

            <div class="space-y-4">
                <div>
                    <label class="font-semibold text-gray-600">Product Title</label>
                    <input type="text" placeholder="Enter product title" class="px-4 py-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-100 border rounded-lg transition-all">
                </div>

                <div>
                    <label class="font-semibold text-gray-600">Product Price</label>
                    <input type="number" placeholder="0.00" class="px-4 py-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-100 border rounded-lg transition-all">
                </div>

                <div>
                    <label class="font-semibold text-gray-600">Category</label>
                    <select class="px-4 py-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-100 border rounded-lg transition-all">
                        <option value="">Select a category</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                    </select>
                </div>
            </div>

            <div class="md:col-span-2">
                <label class="font-semibold text-gray-600">Product Description</label>
                <textarea rows="4" placeholder="Enter description..." class="px-4 py-2 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-100 border rounded-lg transition-all"></textarea>
                
                <button type="submit" class="w-full md:w-auto px-6 py-3 mt-4 text-white rounded-lg text-md font-bold bg-blue-600 hover:bg-blue-700 transition-colors">
                    Add Product
                </button>
            </div>
        </form>
    </div>
</template>
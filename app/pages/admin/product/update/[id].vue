<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
  middleware: 'admin-auth'
})

type UpdateProductResponse = {
  success: boolean
  data: {
    title: string
    description: string
    price: number
    category: string
    image: string
  }
}

const route = useRoute()
const id = route.params.id as string

const { data, pending, error } = await useFetch(`/api/products/${id}`, {
  credentials: 'include'
})


const loading = ref(false)
const fileInput = ref()

const title = ref('')
const description = ref('')
const price = ref<number | null>(null)
const category = ref('')



const imagePreview = ref<string>('')

watchEffect(() => {
  if (data.value?.data) {
    const p = data.value.data
    title.value = p.title
    description.value = p.description
    price.value = p.price
    category.value = p.category
    imagePreview.value = p.image
  }
})


const onImageChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  fileInput.value = file
  if (!file) return

  imagePreview.value = URL.createObjectURL(file)
}

const updateForm = async () => {
  const formData = new FormData()
  formData.append("title", title.value)
  formData.append("description", description.value)
  formData.append("price", String(price.value))
  formData.append("category", category.value)
  if (fileInput.value) {
    formData.append("image", fileInput.value)
  }
  try {
    loading.value = true
    const res = await $fetch<UpdateProductResponse>(`/api/products/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: formData
    })

    title.value = res.data.title
    description.value = res.data.description
    price.value = res.data.price
    category.value = res.data.category
    imagePreview.value = res.data.image

    alert('Product updated successfully')
  } catch (err) {
    console.error(err)
    alert('Update failed')
  } finally {
    loading.value = false
  }
}


useSeo(title.value || 'Update Product', 'Update product details')
</script>


<template>
  <div class="p-6 max-w-5xl">
    <div v-if="pending" class="text-2xl text-center">Loading...</div>
    <div v-else-if="error" class="text-2xl text-center text-red-500">
      Error Occurred
    </div>

    <div v-else>
      <h1 class="text-4xl font-bold text-center mb-10 text-blue-600">
        Update Product
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

        <div class="flex flex-col gap-4">
          <label class="font-semibold text-lg">Product Image</label>

          <img v-if="imagePreview" :src="imagePreview" class="w-full max-h-96 object-contain border rounded-lg" />

          <input type="file" accept="image/*" @change="onImageChange" class="block w-full text-sm" />
        </div>

        <div class="flex flex-col gap-5">
          <div>
            <label class="block font-semibold mb-1">Title</label>
            <input v-model="title" type="text" class="w-full border rounded-lg px-4 py-2" />
          </div>

          <div>
            <label class="block font-semibold mb-1">Description</label>
            <textarea v-model="description" rows="4" class="w-full border rounded-lg px-4 py-2" />
          </div>

          <div>
            <label class="block font-semibold mb-1">Category</label>
            <select v-model="category" type="text" class="w-full border rounded-lg px-4 py-2">
              <option value="electronics">Electronics</option>
              <option value="mens-clothing">Mens Clothing</option>
              <option value="womens-clothing">Womens Clothing</option>
              <option value="jwellery">Jwelleries</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div>
            <label class="block font-semibold mb-1">Price (Rs.)</label>
            <input v-model.number="price" type="number" class="w-full border rounded-lg px-4 py-2" />
          </div>



          <div class="flex gap-4 mt-4">
            <button @click="updateForm" :disabled="loading"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold">
              {{ loading ? "Updating..." : "Update" }}
            </button>

            <button class="px-6 py-2 bg-gray-400 text-white rounded-lg font-bold"
              @click="navigateTo(`/admin/product/${data?.data.id}`)">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

useSeoMeta({
    title: 'Your Profile',
    description: 'View and update your profile'
})

const { data, pending, error } = await useFetch('/api/auth/me', {
    method: "get"
})


const name = ref(data.value?.data?.name ?? '')
const email = ref(data.value?.data?.email ?? '')
const phone = ref<number | null>(data.value?.data?.phone ?? null)

const address1 = ref(data.value?.data?.address?.line1 ?? '')
const address2 = ref(data.value?.data?.address?.line2 ?? '')

const loading = ref(false)
const errorVal = ref('')

const updateProfile = async () => {
    errorVal.value = ''

    if (name.value.length < 3) {
        errorVal.value = 'Name must be at least 3 characters'
        return
    }

    try {
        loading.value = true

        await $fetch('/api/auth/me', {
            method: 'PUT',
            body: {
                name: name.value,
                email: email.value,
                phone: phone.value,
                address: {
                    line1: address1.value,
                    line2: address2.value
                }
            }
        })
        const cookie = useCookie<User>('user_data')
        cookie.value = {
            ...cookie.value,
            name: name.value,
            email: email.value,
            phone: phone.value,
            address: {
                line1: address1.value,
                line2: address2.value
            }
        }
        alert('Profile updated successfully!')
    } catch (err) {
        errorVal.value = 'Failed to update profile'
        console.error(err)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <section class="max-w-5xl mx-auto pb-20">
        <h1 class="text-3xl font-bold text-blue-600 mt-2 text-center">
            Your Profile
        </h1>

        <div v-if="pending" class="text-center mt-4 text-xl font-semibold">
            Loading...
        </div>

        <div v-else-if="error" class="text-center mt-4 text-xl font-semibold text-red-600">
            Failed to load profile
        </div>

        <form v-else @submit.prevent="updateProfile" class="mt-4 bg-white rounded-lg shadow-md p-5">
            <p v-if="errorVal" class="text-red-600 mb-2">{{ errorVal }}</p>

            <div class="mb-3">
                <label class="block text-lg">Name</label>
                <input v-model="name" type="text" required class="w-full border px-4 py-2 rounded-lg" />
            </div>

            <div class="mb-3">
                <label class="block text-lg">Email</label>
                <input v-model="email" type="email" required class="w-full border px-4 py-2 rounded-lg" />
            </div>

            <div class="mb-3">
                <label class="block text-lg">Phone</label>
                <input v-model.number="phone" type="number" class="w-full border px-4 py-2 rounded-lg" />
            </div>

            <div class="mb-3">
                <label class="block text-lg">Address Line 1</label>
                <input v-model="address1" type="text" class="w-full border px-4 py-2 rounded-lg" />
            </div>

            <div class="mb-4">
                <label class="block text-lg">Address Line 2</label>
                <input v-model="address2" type="text" class="w-full border px-4 py-2 rounded-lg" />
            </div>

            <button :disabled="loading" type="submit"
                class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {{ loading ? 'Updating...' : 'Update Profile' }}
            </button>
        </form>
    </section>
</template>

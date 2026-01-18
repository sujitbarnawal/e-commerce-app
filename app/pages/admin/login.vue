<script setup lang="ts">


const email = ref("");
const name = ref("Sujit");
const loading = ref(false)
const error = ref('')

useSeoMeta({
    title: 'Admin Login',
    description: 'Login in as a admin'
});

definePageMeta({
    layout: 'auth',
    middleware:'admin-guest'
})

const { loginAdmin } = useAdminAuth()

const submitForm = async () => {
    error.value = ''
    if (!email.value || !name.value) {
        error.value = "All fields are required"
        return
    }
    try {
        loading.value = true
        await new Promise((res) => setTimeout(res, 1000))
        await loginAdmin({
            name:name.value,
            email:email.value
        })


    } catch (e) {
        console.log(e)
    } finally {
        loading.value = false
    }
}

</script>

<template>
    <section class="flex items-center justify-center min-h-[calc(100vh-100px)] bg-transparent">
        <form @submit.prevent="submitForm"
            class="bg-white shadow-xl rounded-2xl py-8 px-10 w-full max-w-md border border-gray-100">
            <h1 class="text-center text-blue-600 text-3xl font-bold mb-8">Login</h1>
            <div class="text-sm text-red-600 mt-2" v-if="error">{{ error }}</div>
            <div class="space-y-2">
                <div>
                    <label class="block font-semibold text-gray-700 mb-2" for="name">Name</label>


                    <input id="name" type='text' placeholder="Enter your name" v-model="name "
                        class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400">


                </div>
                <div>
                    <label class="block font-semibold text-gray-700 mb-2" for="email">Email</label>
                    <input id="email" type="email" placeholder="Enter your email" v-model="email"
                        class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400">
                </div>


                <button type="submit" :disabled="loading"
                    class="w-full  bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 hover:scale-[1.02] transition-all  shadow-lg">
                    {{ loading ? "Logging in..." : "Login" }}
                </button>
                <p class="mt-2 text-sm">email: sujit@gmail.com</p>
            </div>

           
        </form>
    </section>
</template>
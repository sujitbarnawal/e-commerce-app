<script setup lang="ts">


const email = ref("");
const password = ref("");
const showPassword = ref(false)
const loading=ref(false)
const error = ref('')

useSeoMeta({
    title: 'Login',
    description: 'Login to explore our products'
});

definePageMeta({
    layout:false,
    middleware:'guest'
})

const {login}=useAuth()

const submitForm=async()=>{
    error.value=''
    if( !email.value || !password.value){
        error.value="All fields are required"
        return
    }
    if(password.value.length<8){
       error.value="Password must be at least 8 characters " 
       return
    }
    try{
        loading.value=true
        await new Promise((res)=>setTimeout(res,1000))
        await login({
            email:email.value,
            password:password.value
        })

    }catch(e){
        console.log(e)
    }finally{
        loading.value=false
    }
}

</script>

<template>
    <section class="flex items-center justify-center min-h-[calc(100vh-100px)] bg-transparent">
        <form @submit.prevent="submitForm" class="bg-white shadow-xl rounded-2xl py-8 px-10 w-full max-w-md border border-gray-100">
            <h1 class="text-center text-blue-600 text-3xl font-bold mb-8">Login</h1>
            <div class="text-sm text-red-600 mt-2" v-if="error">{{ error }}</div>
            <div class="space-y-2">
                <div>
                    <label class="block font-semibold text-gray-700 mb-2" for="email">Email</label>
                    <input id="email" type="email" placeholder="Enter your email" v-model="email"
                        class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400">
                </div>
                <div>
                    <label class="block font-semibold text-gray-700 mb-2" for="password">Password</label>
                    <div class="relative">

                        <input id="password" :type="showPassword ? 'text' : 'password'"
                            placeholder="Enter your passsword" v-model="password"
                            class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400">
                        <button type="button" @click="showPassword=!showPassword"
                            class="absolute top-0 bottom-0 right-0 pr-4 flex items-center">
                            <span v-if="!showPassword"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="blue"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg></span>
                            <span v-else ><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="blue"><path d="m637-425-62-62q4-38-23-65.5T487-576l-62-62q13-5 27-7.5t28-2.5q70 0 119 49t49 119q0 14-2.5 28t-8.5 27Zm133 133-52-52q36-28 65.5-61.5T833-480q-49-101-144.5-158.5T480-696q-26 0-51 3t-49 10l-58-58q38-15 77.5-21t80.5-6q143 0 261.5 77.5T912-480q-22 57-58.5 103.5T770-292Zm-2 202L638-220q-38 14-77.5 21t-80.5 7q-143 0-261.5-77.5T48-480q22-57 58-104t84-85L90-769l51-51 678 679-51 51ZM241-617q-35 28-65 61.5T127-480q49 101 144.5 158.5T480-264q26 0 51-3.5t50-9.5l-45-45q-14 5-28 7.5t-28 2.5q-70 0-119-49t-49-119q0-14 3.5-28t6.5-28l-81-81Zm287 89Zm-96 96Z"/></svg></span>
                        </button>
                    </div>
                </div>

                <button type="submit" :disabled="loading"
                    class="w-full  bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 hover:scale-[1.02] transition-all  shadow-lg">
                    {{loading?"Logging in...":"Login"}}
                </button>
            </div>

            <p class="text-center text-gray-500 mt-6 text-sm">
                Don't have an account? <NuxtLink to="/signup" class="text-blue-600 font-bold hover:underline">Sign up
                </NuxtLink>
            </p>
        </form>
    </section>
</template>
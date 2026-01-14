<script setup lang="ts">
const isMobileMenu = ref(false)
const {cart}=useCart()
const {user}=useAuth()
</script>

<template>
    <header class=" flex items-center h-[60px] sticky top-0 bg-white">
        <nav class="w-[90%] mx-auto flex items-center justify-between">

            <p @click="navigateTo('/')" class="text-blue-600 text-xl font-bold cursor-pointer">Online Pasal</p>
            <div class="hidden md:flex items-center gap-4 text-lg ">
                <NuxtLink class="text-blue-600 hover:scale-105 transition-transform duration-75"
                    active-class="underline" to="/">Home</NuxtLink>
                <NuxtLink class="text-blue-600 hover:scale-105 transition-transform duration-75"
                    active-class="underline" to="/about">About</NuxtLink>
                <NuxtLink class="text-blue-600 hover:scale-105 transition-transform duration-75"
                    active-class="underline" to="/products">Products</NuxtLink>
                <NuxtLink class="text-blue-600 hover:scale-105 transition-transform duration-75"
                    active-class="underline" to="/contact">Contact</NuxtLink>
                <NuxtLink class="text-blue-600 hover:scale-105 transition-transform duration-75 relative"
                    active-class="underline" to="/cart">Cart <span v-if="cart.length>0" class="absolute bottom-3 left-7 text-7xl text-red-600">.</span></NuxtLink>
            </div>
            <p @click="isMobileMenu = true" class="md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="blue">
                    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                </svg>
            </p>

            <div v-if="isMobileMenu" class="bg-white w-1/2 h-screen flex gap-2 flex-col absolute top-0 left-0 md:hidden p-5 text-xl">
                <p @click="isMobileMenu=false" class="absolute right-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px"
                        fill="blue">
                        <path
                            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                </p>
                <p class="text-white text-center bg-blue-600 w-1/2 rounded-lg p-1 text-sm" v-if="user">{{ user?.name.split(' ')[0] }}</p>
                <NuxtLink @click="isMobileMenu = false"
                    class="text-blue-600 hover:scale-105 transition-transform duration-75" active-class="underline"
                    to="/">Home</NuxtLink>
                <NuxtLink @click="isMobileMenu = false"
                    class="text-blue-600 hover:scale-105 transition-transform duration-75" active-class="underline"
                    to="/about">About</NuxtLink>
                <NuxtLink @click="isMobileMenu = false"
                    class="text-blue-600 hover:scale-105 transition-transform duration-75" active-class="underline"
                    to="/products">Products</NuxtLink>
                <NuxtLink @click="isMobileMenu = false" class="text-blue-600 hover:scale-105 transition-transform duration-75"
                    active-class="underline" to="/contact">Contact</NuxtLink>
                <NuxtLink @click="isMobileMenu = false"
                    class="text-blue-600 hover:scale-105 transition-transform duration-75 relative" active-class="underline"
                    to="/cart">Cart <span v-if="cart.length>0" class="absolute bottom-3 left-7 text-7xl text-red-600">.</span></NuxtLink>
            </div>

        </nav>
        <p class="hidden md:flex bg-blue-600 w-5 h-5  items-center justify-center font-bold mr-4 text-white rounded-full p-5"  v-if="user">{{ user.name.charAt(0).toUpperCase() }}</p>
    </header>
</template>
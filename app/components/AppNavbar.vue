<template>
    <header class=" flex items-center h-[60px] sticky top-0 bg-white">
        <nav class="w-[90%] mx-auto flex items-center justify-between">

            <p class="text-blue-600 text-xl font-bold">Ecommerce</p>
            <div class=" flex items-center gap-3 text-lg">
                <NuxtLink class="text-blue-600 hover:underline" to="/about">About</NuxtLink>
                <NuxtLink class="text-blue-600 hover:underline" to="/products">Products</NuxtLink>
                <NuxtLink class="text-blue-600 hover:underline" to="/cart">Cart</NuxtLink>

            </div>

        </nav>
    </header>
</template>
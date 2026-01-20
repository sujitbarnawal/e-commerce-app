<script setup lang="ts">
    const {admin,logoutAdmin}=useAdminAuth()
</script>
<template>
    <header class=" flex items-center h-[60px] sticky top-0 bg-white">
        <nav class="w-[90%] mx-auto flex items-center justify-between">

            <h1 @click="navigateTo('/admin')" class="text-xl cursor-pointer font-bold text-blue-600 ">Online Pasal</h1>
            <div class="flex gap-2 items-center">

                <p class="font-bold text-white bg-blue-600 rounded-[100%] px-3.5 py-2">A</p>
                <p @click="logoutAdmin" v-if="admin"
                    class="text-blue-500 text-sm w-1/2 border-blue-500 border-2 flex items-center justify-center bg-white py-1 px-2 cursor-pointer rounded-xl">
                    Logout</p>
            </div>

        </nav>
    </header>
</template>
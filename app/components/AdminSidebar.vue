<template>
    <section class="w-[100px] md:w-[300px] min-h-[calc(100vh-60px)] bg-white p-5">
        <div @click="navigateTo('/admin')" class="ml-5 flex items-center gap-14 hover:border cursor-pointer justify-center md:justify-between mt-2 rounded-lg p-2">
            <p class="hidden md:block text-xl text-blue-600 font-semibold" to="/">Home</p>
            <p class="bg-[#d6d6ed] p-2 rounded-full w-10"><svg xmlns="http://www.w3.org/2000/svg" height="24px"
                    viewBox="0 -960 960 960" width="24px" fill="blue">
                    <path
                        d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
                </svg></p>
        </div>

        <div  @click="navigateTo('/admin/dashboard')" class="ml-5 flex items-center gap-3 hover:border cursor-pointer justify-center md:justify-between mt-2 rounded-lg p-2">
            <p class="hidden md:block text-xl text-blue-600 font-semibold" to="/dashboard">Dashboard</p>
            <p class="bg-[#d6d6ed] p-2 rounded-full w-10"><svg xmlns="http://www.w3.org/2000/svg" height="24px"
                    viewBox="0 -960 960 960" width="24px" fill="blue">
                    <path
                        d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
                </svg></p>
        </div>

        <div @click="navigateTo('/admin/products')" class="ml-5 flex items-center gap-7 hover:border cursor-pointer justify-center md:justify-between mt-2 rounded-lg p-2">
            <p class="hidden md:block text-xl text-blue-600 font-semibold" to="/products">Products</p>
            <p class="bg-[#d6d6ed] p-2 rounded-full w-10"><svg xmlns="http://www.w3.org/2000/svg" height="24px"
                    viewBox="0 -960 960 960" width="24px" fill="blue">
                    <path
                        d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
                </svg></p>
        </div>

    </section>
</template>
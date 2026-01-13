<script setup lang="ts">
    const currentYear= computed(()=>{
        return new Date().getFullYear()
    })
</script>

<template>
    <footer class="bg-blue-700 text-slate-300">
        <div class="max-w-7xl mx-auto px-4 py-16">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                <div class="space-y-4">
                    <h2 class="text-white text-2xl font-bold">Online Pasal</h2>
                    <p class="text-sm leading-relaxed">
                        The most trusted e-commerce platform in Nepal. Delivering quality to your doorstep.
                    </p>
                </div>

                <div>
                    <h3 class="text-white font-semibold mb-4">Shop</h3>
                    <ul class="space-y-2 text-sm">
                        <li>
                            <NuxtLink to="/" class="hover:text-white">Home</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/products" class="hover:text-white">All Products</NuxtLink>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-white font-semibold mb-4">Support</h3>
                    <ul class="space-y-2 text-sm">
                        <li>
                            <NuxtLink to="/about" class="hover:text-white">About Us</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/contact" class="hover:text-white">Contact</NuxtLink>
                        </li>
                    </ul>
                </div>

                <div class="space-y-4">
                    <h3 class="text-white font-semibold">Join our Newsletter</h3>
                    <div class="flex">
                        <input id="subscribe" type="email" placeholder="Email"
                            class="bg-slate-800 border-none rounded-l-lg px-4 py-2 w-full focus:ring-1 focus:ring-blue-500 focus:outline-none">
                        <button
                            class="bg-white text-blue-600 px-4 py-2 rounded-r-lg hover:scale-105 transition-transform">Join</button>
                    </div>
                </div>
            </div>

            <div
                class="border-t border-white mt-12 pt-8 flex flex-col text-white md:flex-row justify-between items-center gap-4">
                <p class="text-xs ">© {{ currentYear }} Online Pasal Pvt. Ltd.</p>
                <div class="flex gap-4">
                    <span >E-sewa</span>
                    <span >Cash on Delivery</span>
                </div>
            </div>
        </div>
    </footer>
</template>
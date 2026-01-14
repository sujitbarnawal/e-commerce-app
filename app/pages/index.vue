<script setup lang="ts">
useSeo("Home", "Visit the Online Pasal home page")
</script>

<template>
    <section class="max-w-4xl mx-auto px-4 py-12 text-center max-md:mt-[50%] md:pt-[12%]">
        <h1 class="text-4xl font-bold text-gray-900 mb-6">
            तपाईंको आफ्नै डिजिटल पसल, <span class="text-blue-600">Online Pasal</span>
        </h1>
        <p class="text-lg text-gray-600  md:text-xl">
            Experience the future of shopping with <strong>Online Pasal</strong>.
            हामी तपाईंका दैनिक आवश्यकतादेखि विलासिताका सामानहरूसम्म सबै कुरा एकै ठाउँमा उपलब्ध गराउँछौं।
            Fast delivery, secure payments, and a local touch—all just one click away.
        </p>
        <div class="mt-8 justify-center flex flex-col sm:flex-row gap-2">
            <NuxtLink to="/login"
                class="bg-white text-blue-600 px-8 py-3 rounded-full font-medium transition-transform hover:scale-105 inline-block">
                Login Now
            </NuxtLink>
            <NuxtLink to="/products"
                class="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-transform hover:scale-105 inline-block">
                Shop Now
            </NuxtLink>
        </div>
    </section>

</template>
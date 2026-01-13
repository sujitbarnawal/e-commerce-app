<script setup lang="ts">
import AppNavbar from '~/components/AppNavbar.vue';

</script>

<template>
    <AppNavbar/>
    <main class="min-h-[calc(100vh-70px)] w-[90%] mx-auto mt-2">
        <slot/>
    </main>
    <AppFooter/>
</template>
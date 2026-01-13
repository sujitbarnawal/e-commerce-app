<script setup lang="ts">
import AppNavbar from '~/components/AppNavbar.vue';

</script>

<template>
    <AppNavbar/>
    <main class="min-h-[calc(100vh-100px)]">
        <slot/>
    </main>
    <AppFooter/>
</template>
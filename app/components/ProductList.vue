<script setup lang="ts">
import type { Product } from '~/types/ProductType';
import ProductItem from './ProductItem.vue';

    const props = defineProps<{
        products:Product[] 
    }>()
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        <ProductItem @click="navigateTo(`/product/${p.id}`)" v-for="p in props.products" :key="p.id" :product="p"/>
    </div>
</template>
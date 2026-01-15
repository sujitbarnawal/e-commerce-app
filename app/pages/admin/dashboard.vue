<script setup lang="ts">
    definePageMeta({
        layout:'admin-layout'
    })
    useSeo('Dashboard','All stats about orders')
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Business Dashboard</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl shadow-sm border">
        <p class="text-sm text-gray-500 uppercase">Total Revenue</p>
        <p class="text-3xl font-bold">Rs.12,450.00</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border">
        <p class="text-sm text-gray-500 uppercase">Active Orders</p>
        <p class="text-3xl font-bold">24</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border">
        <p class="text-sm text-gray-500 uppercase">Total Customers</p>
        <p class="text-3xl font-bold">1,105</p>
      </div>
    </div>
    </div>
</template>
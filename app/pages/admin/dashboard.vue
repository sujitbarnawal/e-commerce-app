<script setup lang="ts">
    definePageMeta({
        layout:'admin-layout',
        middleware:'admin-auth'
    })
    useSeo('Dashboard','All stats about orders')
    const {data,pending,error}=await useFetch('/api/admin/dashboard',{
      method:'get',
      credentials:'include'
    })
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Business Dashboard</h1>
    <div class="text-2xl font-semibold" v-if="pending">Loading....</div>
    <div class="text-2xl font-semibold" v-else-if="error">Error Occured</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl shadow-sm border">
        <p class="text-sm text-gray-500 uppercase">Total Revenue</p>
        <p class="text-3xl font-bold">{{ data?.data.stats.totalRevenue }}</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border">
        <p class="text-sm text-gray-500 uppercase">Active Orders</p>
        <p class="text-3xl font-bold">{{ data?.data.stats.totalOrders }}</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border">
        <p class="text-sm text-gray-500 uppercase">Total Customers</p>
        <p class="text-3xl font-bold">{{ data?.data.stats.totalUsers }}</p>
      </div>
    </div>
    </div>
</template>
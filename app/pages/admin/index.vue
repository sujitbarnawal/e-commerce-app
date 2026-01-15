<script setup lang="ts">
    useSeo('Admin','Explore the admin home page')
    definePageMeta({
        layout:'admin-layout'
    })
</script>
<template>
  <div class="p-8 max-w-4xl">
    <h1 class="text-3xl text-center text-blue-600 font-bold mb-4">Admin Control Center</h1>
    <p class="text-gray-600 mb-6">Welcome back! Use this panel to manage your store's operations effectively.</p>
    
    <div class="grid gap-6">
      <div class="bg-blue-50 p-4 border-l-4 border-blue-500">
        <h3 class="font-bold">Inventory Management</h3>
        <p>Add, edit, and track your products in the Products tab.</p>
      </div>
      <div class="bg-green-50 p-4 border-l-4 border-green-500">
        <h3 class="font-bold">Order Processing</h3>
        <p>Monitor customer purchases and update order statuses from the Dashboard.</p>
      </div>
    </div>
  </div>
</template>


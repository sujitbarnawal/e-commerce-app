<script setup lang="ts">
import AdminNavbar from '~/components/AdminNavbar.vue';
import AdminSidebar from '~/components/AdminSidebar.vue';

</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <AdminNavbar />

    <div class="flex flex-1 overflow-hidden">
      <AdminSidebar />

      <main class="flex-1  overflow-y-auto p-4">
        <slot />
      </main>
    </div>
  </div>
</template>
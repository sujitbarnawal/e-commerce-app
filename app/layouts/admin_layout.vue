<script setup lang="ts">
import AdminNavbar from '~/components/AdminNavbar.vue';
import AdminSidebar from '~/components/AdminSidebar.vue';

</script>

<template>
  <div class="admin-container">
    <AdminNavbar />
    <div class="flex">
      <AdminSidebar />
      <main>
        <slot /> 
      </main>
    </div>
  </div>
</template>
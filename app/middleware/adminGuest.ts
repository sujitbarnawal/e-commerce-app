export default defineNuxtRouteMiddleware((to, from) => {
  const { admin } = useAdminAuth()

  if (admin.value) {
    return navigateTo('/admin')
  }
  
})
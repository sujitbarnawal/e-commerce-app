export const useAdminAuth = () => {
  const admin = useState<any>('admin', () => null)
  const cookie =useCookie('admin_token')
  if(!admin.value && cookie.value){
    admin.value=cookie.value
  }

  const loginAdmin = async (payload: { email: string; password: string }) => {
    try {
      const res = await $fetch('/api/admin/login', {
        method: 'POST',
        body: payload,
      })

      admin.value = res.data.user
      await navigateTo('/admin')
    } catch (err: any) {
      alert(err.statusMessage || 'Login failed')
    }
  }

  const logoutAdmin = async () => {
    await $fetch('/api/admin/logout',{
        method:'POST'
    })
    admin.value = null
    await navigateTo('/admin/login')
  }


  return { loginAdmin, logoutAdmin, admin }
}

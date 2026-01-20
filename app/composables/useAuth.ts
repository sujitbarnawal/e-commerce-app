

export const useAuth = () => {
  
  const token = useCookie('auth_token')
  const user = useCookie<any | null>('user_data')
  
  const signup=async(payload: {name:string, email: string; password: string })=>{
    try{
      const res:any =await $fetch('/api/auth/signup',{
        method:'POST',
        body:payload
      })
      if(res.success){
        return navigateTo('/login')
      }
    }catch(err:any){
        alert(err.data?.statusMessage || 'Signup failed')
    }
  }

  const login = async (payload: { email: string; password: string }) => {
    try {
      const res: any = await $fetch('/api/auth/login', {
        method: 'POST',
        body: payload,
      })

      user.value = res.data.user 

      return navigateTo('/')
    } catch (err: any) {
      alert(err.data?.statusMessage || 'Login failed')
    }
  }

  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
    } catch (e) {
      console.error("Logout request failed", e)
    }

    user.value = null
    token.value = null
    return navigateTo('/login')
  }

  return { signup, login, logout, user }
}
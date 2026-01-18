export const useAdminAuth = () => {
    
    const adminUser = {
        name: 'Sujit',
        email: "sujit@gmail.com"
    }

    const adminCookie = useCookie('admin')

    const loginAdmin = async (payload: Partial<User>) => {
        
        if (payload.name === adminUser.name && payload.email === adminUser.email) {
            adminCookie.value = JSON.stringify(adminUser)
            await navigateTo('/admin')
        } else {
            alert("Invalid credentials")
        }
    }

    const logoutAdmin = async () => {
        adminCookie.value = null
        await navigateTo('/admin/login')
    }

    return { 
        loginAdmin, 
        logoutAdmin, 
        admin: adminCookie 
    }
}
export type User={
    name:string ,
    email:string,
    password:string,
    address:{
        line1:string|null,
        line2:string|null
    }

}

export const useAuth = () => {
    const user = useState<User | null>('user', () => null)
    const cookie = useCookie<User | null>('auth_user')

    if (!user.value && cookie.value) {
        user.value = cookie.value
    }

    const signup = async (payload: User) => {
        cookie.value = payload
        await navigateTo('/login')
    }

    const login = async (payload: Partial<User>) => {
        const savedUser = cookie.value
        if (savedUser?.email === payload.email && savedUser?.password === payload.password) {
            user.value = savedUser
            await navigateTo('/')
        } else {
           alert("Invalid Credentials")
        }
    }

    const logout = async () => {
        user.value = null
        // cookie.value = null
        await navigateTo('/login')
    }

    return { user, signup, login, logout }
}
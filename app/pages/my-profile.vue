<script setup lang="ts">
const { user } = useAuth()
const name = ref(user.value?.name||'')
const email = ref(user.value?.email||'')
const address1 = ref(user.value?.address.line1||'')
const address2 = ref(user.value?.address.line2||'')
const phone=ref(user?.value?.phone|| null)
const error = ref('')
const loading = ref(false)

definePageMeta({
    middleware:'auth'
})

const updateProfile = async () => {
    error.value = ""
    if (name.value && name.value.length < 3) {
        error.value = 'Name must be atleast 3 letters'
        return
    }
    try {
        loading.value = true
        await new Promise((res) => setTimeout(res, 1000))
        const updatedData:User={
            ...user.value,
            name:name.value,
            email:email.value,
            password:user.value?.password || '',
            address:{
                line1:address1.value,
                line2:address2.value
            },
            phone:phone.value
        }
        user.value=updatedData
        const cookie = useCookie<User | null>("auth_user")
        cookie.value = updatedData
        alert('Profile Updated!')

    } catch (e) {
        console.log(e)
        error.value="Failed to update"
    } finally {
        loading.value = false
    }
}

useSeo(name.value!, 'View your profile')

</script>

<template>
    <section class="max-w-5xl mx-auto pb-20">
        <h1 class="text-3xl font-bold text-blue-600 mt-2 text-center">Your Profile</h1>

        <form @submit.prevent="updateProfile"
            class="mt-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5">
            <div class="mt-2 text-sm text-red-600" v-if="error">{{ error }}</div>
            <div>
                <label class="text-xl block mt-2 " for="name">Your Name</label>
                <input placeholder="Enter your name" required="true" type="text" v-model="name"
                    class="px-4 py-2 w-full border mt-2 text-xl focus:outline-none focus:ring rounded-lg">
            </div>
            <div>
                <label class="text-xl block mt-2 " for="name">Your Email</label>
                <input placeholder="Enter your email" required="true" type="email" v-model="email"
                    class="px-4 py-2 w-full border mt-2 text-xl focus:outline-none focus:ring rounded-lg">
            </div>
            <div>
                <label class="text-xl block mt-2 " for="phone">Your Phone Number</label>
                <input placeholder="Enter your phone number" required="true" type="number" v-model.number="phone"
                    class="px-4 py-2 w-full border mt-2 text-xl focus:outline-none focus:ring rounded-lg">
            </div>
            <div>
                <label class="text-xl block mt-2 " for="name">Address Line 1</label>
                <input placeholder="Enter address line 1" required="true" type="text" v-model="address1"
                    class="px-4 py-2 w-full border mt-2 text-xl focus:outline-none focus:ring rounded-lg">
            </div>
            <div>
                <label class="text-xl block mt-2 " for="name">Address Line 2</label>
                <input placeholder="Enter address line 2" required="true" type="text" v-model="address2"
                    class="px-4 py-2 w-full border mt-2 text-xl focus:outline-none focus:ring rounded-lg">
            </div>
            <button :disabled="loading"
                class="bg-blue-600 hover:bg-blue-700 transition-colors text-xl mt-3 text-white mb-4 px-4 py-2 rounded-lg max-sm:w-full"
                type="submit">{{loading?"Updating...":"Update Profile"}}</button>

        </form>

    </section>
</template>
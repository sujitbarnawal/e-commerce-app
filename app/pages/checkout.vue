<script setup lang="ts">
const { cart, cartCount, cartTotal } = useCart()

const delivery_fee = computed(() => {
    return cartCount.value <= 2 ? 100 : 200
})

const {user}=useAuth()
definePageMeta({
    middleware:'auth'
})

useSeo('Checkout',"Place your Order")

const placeOrder=async()=>{}

</script>

<template>
    <section class="max-w-7xl mx-auto pb-20 =">
        <h1 class="text-4xl font-bold mb-8 text-center mt-8 text-blue-600">Checkout</h1>

        <div class="flex  flex-col gap-4">
            <div class="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow ">
                <div class="flex justify-between items-center">

                    <h2 class="text-2xl font-semibold">Delivery Address</h2>
                    <button @click="navigateTo('/my-profile')" class="text-white bg-blue-600 px-4 py-2 rounded-lg ">Change</button>
                </div>
                <p class="mt-2 text-xl">{{ user?.name }}</p>
                <Address class="text-xl mt-2">{{ user?.address.line1 }}</Address>
                <Address class="text-xl">{{ user?.address.line2 }}</Address>
                <p v-if="user?.phone" class="text-lg mt-2">Phone: +977-{{user?.phone}}</p>
            </div>
            <div class="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow ">
                <h2 class="text-2xl font-semibold  ">Order Items</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div v-for="p in cart" :key="p.id">
                        <p class="text-xl font-semibold mt-2">Item {{ cart.indexOf(p) + 1 }}</p>
                        <p class="text-xl">{{ p.title }}</p>
                        <p class="text-xl">Quantity:{{ p.quantity }}</p>
                    </div>
                </div>
            </div>
            <div class="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow ">
                <h2 class="text-2xl font-semibold  ">Payment</h2>

                <div>
                    <div class="space-y-3">
                        <label
                            class="flex  items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                            <input type="radio" name="payment" value="esewa" class="w-4 h-4 text-blue-600 " checked />
                            <div style="margin-left: 10px">
                                <p class="font-medium text-gray-900">eSewa</p>
                                <p class="text-sm text-gray-500">Pay securely with eSewa wallet</p>
                            </div>

                        </label>
                        <label
                            class="flex  items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                            <input type="radio" name="payment" value="cod" class="w-4 h-4  text-blue-600" />

                            <div style="margin-left: 10px">
                                <p class="font-medium text-gray-900">Cash on Delivery</p>
                                <p class="text-sm text-gray-500">Pay when you receive the order</p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <div class="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow ">
                <h2 class="text-2xl font-semibold">Order Summary</h2>
                <p class="mt-2 text-xl">Subtotal({{ cartCount }} items)</p>
                <p class="text-xl ">Price: Rs.{{ cartTotal.toFixed() }}</p>
                <p class="text-xl ">Delivery Fee: Rs.{{ Number(delivery_fee) }}</p>
                <p class="text-lg mt-2 font-semibold">Total: Rs.{{ Number(cartTotal.toFixed()) + Number(delivery_fee) }}
                </p>
                <button @click="placeOrder"
                    class="w-[200px] max-md:w-full bg-blue-600 mt-2 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                    Place Order
                </button>

                <p class="text-sm text-gray-500 text-center mt-4">
                    By placing your order, you agree to our terms and conditions
                </p>
            </div>
        </div>
    </section>
</template>
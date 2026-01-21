<script setup lang="ts">
interface OrderItem {
    productId: string
    quantity: number
    price: number
    product?: {
        id: string
        title: string
        image: string
        price: number
        category: string
    }
}

interface Order {
    id: string
    userId: string
    items: OrderItem[]
    itemsWithProducts: OrderItem[]
    total: number
    status: string
    paymentMethod: string
    shippingAddress: {
        name: string
        phone: string
        address: {
            line1: string
            line2: string
        }
    }
    createdAt: string
}

definePageMeta({
    middleware: 'auth'
})

useSeo('My Orders', 'View your order history')

const { data: ordersData, pending, error, refresh } = await useFetch('/api/orders', {
    method: 'GET'
})

const orders = computed(() => ordersData.value?.data || [])

const handleRefresh = () => {
    refresh()
}

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        processing: 'bg-blue-100 text-blue-800 border-blue-300',
        shipped: 'bg-purple-100 text-purple-800 border-purple-300',
        delivered: 'bg-green-100 text-green-800 border-green-300',
        cancelled: 'bg-red-100 text-red-800 border-red-300'
    }
    return colors[status.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-300'
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
        esewa: 'eSewa',
        cod: 'Cash on Delivery',
        khalti: 'Khalti'
    }
    return labels[method.toLowerCase()] || method
}
</script>

<template>
    <section class="max-w-7xl mx-auto px-4 py-8 min-h-screen">
        <div class="mb-8">
            <h1 class="text-4xl font-bold text-blue-600 mb-2">My Orders</h1>
            <p class="text-gray-600">Track and manage your orders</p>
        </div>


        <div v-if="pending" class="flex justify-center items-center py-20">
            <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        </div>


        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p class="text-red-600 text-lg font-semibold mb-2">Failed to load orders</p>
            <p class="text-red-500 mb-4">{{ error.message }}</p>
            <button @click="handleRefresh"
                class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                Try Again
            </button>
        </div>


        <div v-else-if="orders.length === 0" class="bg-white rounded-lg shadow-md p-12 text-center">
            <svg class="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 class="text-2xl font-semibold text-gray-700 mb-2">No orders yet</h2>
            <p class="text-gray-500 mb-6">Start shopping to see your orders here</p>
            <button @click="navigateTo('/products')"
                class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Browse Products
            </button>
        </div>


        <div v-else class="space-y-6">
            <div v-for="order in orders" :key="order.id"
                class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">

                <!-- Order Header -->
                <div class="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b border-blue-200">
                    <div class="flex flex-wrap justify-between items-start gap-4">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">Order ID</p>
                            <p class="text-lg font-semibold text-gray-900">#{{ order.id }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 mb-1">Order Date</p>
                            <p class="text-lg font-medium text-gray-900">{{ formatDate(order.createdAt) }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 mb-2">Status</p>
                            <span class="px-4 py-2 rounded-full text-sm font-semibold border-2"
                                :class="getStatusColor(order.status)">
                                {{ order.status.toUpperCase() }}
                            </span>
                        </div>
                    </div>
                </div>


                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-4 text-gray-800">Order Items</h3>
                    <div class="space-y-4">
                        <div v-for="item in order.itemsWithProducts" :key="item.productId"
                            class="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <img v-if="item.product?.image" :src="item.product.image" :alt="item.product.title"
                                class="w-24 h-24 object-contain rounded-lg bg-white p-2" />
                            <div class="flex-1">
                                <h4 class="font-semibold text-lg text-gray-900 mb-1">
                                    {{ item.product?.title || 'Product' }}
                                </h4>
                                <p class="text-sm text-gray-600 mb-2">{{ item.product?.category }}</p>
                                <div class="flex gap-4 text-sm">
                                    <span class="text-gray-700">Quantity: <strong>{{ item.quantity }}</strong></span>
                                    <span class="text-gray-700">Price: <strong>Rs. {{ item.price.toFixed(2)
                                            }}</strong></span>

                                </div>
                                <span class="text-blue-600 text-sm font-semibold mt-2">
                                    Subtotal: Rs. {{ (item.quantity * item.price).toFixed(2) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Shipping & Payment Info -->
                <div class="grid md:grid-cols-2 gap-6 p-6 bg-gray-50 border-t border-gray-200">
                    <div>
                        <h4 class="font-semibold text-lg mb-3 text-gray-800">Shipping Address</h4>
                        <div class="space-y-1 text-gray-700">
                            <p class="font-medium">{{ order.shippingAddress.name }}</p>
                            <p>{{ order.shippingAddress.address.line1 }}</p>
                            <p>{{ order.shippingAddress.address.line2 }}</p>
                            <p class="mt-2">Phone: +977-{{ order.shippingAddress.phone }}</p>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-semibold text-lg mb-3 text-gray-800">Payment Details</h4>
                        <div class="space-y-2">
                            <p class="text-gray-700">
                                Method: <span class="font-medium">{{ getPaymentMethodLabel(order.paymentMethod)
                                    }}</span>
                            </p>
                            <div class="pt-3 border-t border-gray-300">
                                <p class="text-2xl font-bold text-blue-600">
                                    Total: Rs. {{ order.total.toFixed(2) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Refresh Button -->
        <div v-if="orders.length > 0" class="mt-8 text-center">
            <button @click="handleRefresh"
                class="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-6 rounded-lg border-2 border-blue-600 transition-colors">
                Refresh Orders
            </button>
        </div>
    </section>
</template>
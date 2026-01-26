<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'admin-layout',
  middleware: 'admin-auth'
})

useSeo('Orders', 'All orders')


type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

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
  } | null
}

interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  paymentMethod: string
  shippingAddress: {
    name: string
    phone: string | number
    address: {
      line1: string
      line2: string
    }
  }
  createdAt: string
  user?: {
    id: string
    name: string
    email: string
  } | null
}

const { data: ordersData, pending, error, refresh } = await useFetch('/api/admin/orders', {
  method: 'GET'
})

const orders = computed(() => ordersData.value?.data || [])

const updatingStatus = ref<Record<string, boolean>>({})

const handleRefresh = () => refresh()


const getStatusClass = (status: OrderStatus) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-700'
    case 'processing': return 'bg-blue-100 text-blue-700'
    case 'shipped': return 'bg-purple-100 text-purple-700'
    case 'delivered': return 'bg-green-100 text-green-700'
    case 'cancelled': return 'bg-red-100 text-red-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
  updatingStatus.value[orderId] = true

  try {
    const response = await $fetch<{ success: boolean }>(`/api/orders/${orderId}`, {
      method: 'PATCH',
      body: {
        status: newStatus
      }
    })

    if (response.success) {
      const order = orders.value.find(o => o.id === orderId)
      if (order) {
        order.status = newStatus
      }
      alert('Order status updated successfully!')
    }
  } catch (err: any) {
    console.error('Failed to update status:', err)
    alert(err.data?.statusMessage || 'Failed to update order status')
    await handleRefresh()
  } finally {
    updatingStatus.value[orderId] = false
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const totalRevenue = computed(() =>
  orders.value.reduce((sum, order) => sum + order.total!, 0)
)
</script>

<template>
  <section class="md:p-6 max-w-7xl">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Customer Orders</h1>
      <div class="flex gap-2">
        <span class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
          Total: {{ orders.length }} Orders
        </span>
        <span class="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
          Revenue: Rs.{{ totalRevenue.toFixed(2) }}
        </span>
      </div>
    </div>

    <div v-if="pending" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <p class="text-red-600 text-lg font-semibold mb-2">Failed to load orders</p>
      <p class="text-red-500 mb-4">{{ error.message }}</p>
      <button @click="handleRefresh" class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg">
        Try Again
      </button>
    </div>

    <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div v-if="orders.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">No orders found</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Order ID</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Customer</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Items</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Amount</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Payment</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Action</th>
            </tr>
          </thead>

          <tbody class="divide-y">
            <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 font-medium">#{{ order.id.slice(0, 8) }}</td>

              <td class="px-6 py-4">
                <p class="font-medium">{{ order.user?.name || 'Unknown' }}</p>
                <p class="text-xs text-gray-500">{{ order.user?.email || 'N/A' }}</p>
              </td>

              <td class="px-6 py-4">{{ order.itemsWithProducts.length }} items</td>

              <td class="px-6 py-4 text-sm text-gray-500">
                {{ formatDate(order.createdAt!) }}
              </td>

              <td class="px-6 py-4 font-bold">
                Rs.{{ order.total!.toFixed(2) }}
              </td>

              <td class="px-6 py-4 text-sm capitalize">
                {{ order.paymentMethod }}
              </td>

              <td class="px-6 py-4">
                <span :class="getStatusClass(order.status)" class="px-3 py-1 rounded-full text-xs font-bold capitalize">
                  {{ order.status }}
                </span>
              </td>

              <td class="px-6 py-4">
                <select :value="order.status" :disabled="updatingStatus[order.id]" @change="(e) => {
                  const value = (e.target as HTMLSelectElement).value as OrderStatus;
                  updateOrderStatus(order.id, value);
                }" class="text-xs border rounded-lg p-1.5 bg-white disabled:bg-gray-100">
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <span v-if="updatingStatus[order.id]" class="ml-2 text-xs text-blue-600">
                  Updating...
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="orders.length > 0" class="mt-6 text-center">
      <button @click="handleRefresh" class="bg-white border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-lg">
        Refresh Orders
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import adminAuth from '~/middleware/adminAuth';

definePageMeta({
    layout: 'admin-layout',
    middleware:adminAuth
})
useSeo('Orders', 'All orders')

interface Order {
    id: string;
    customer: string;
    date: string;
    total: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

const orders = ref<Order[]>([
    { id: '#ORDER-2', customer: 'Roman', date: '2023-10-24', total: 450.00, status: 'Processing' },
    { id: '#ORDER-1', customer: 'Sujit', date: '2023-10-24', total: 125.50, status: 'Pending' },
    { id: '#ORDER-3', customer: 'Aaditya', date: '2023-10-23', total: 89.99, status: 'Shipped' },
    { id: '#ORDER-4', customer: 'Ganesh', date: '2023-10-22', total: 210.00, status: 'Delivered' },
    { id: '#ORDER-5', customer: 'Ankit', date: '2023-10-21', total: 55.20, status: 'Cancelled' },
])


const getStatusClass = (status: string) => {
    switch (status) {
        case 'Pending': return 'bg-yellow-100 text-yellow-700'
        case 'Processing': return 'bg-blue-100 text-blue-700'
        case 'Shipped': return 'bg-purple-100 text-purple-700'
        case 'Delivered': return 'bg-green-100 text-green-700'
        case 'Cancelled': return 'bg-red-100 text-red-700'
        default: return 'bg-gray-100 text-gray-700'
    }
}
</script>

<template>
    <section class="md:p-6 max-w-4xl">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Customer Orders</h1>
            <div class="flex gap-2">
                <span class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">Total: {{ orders.length }} Orders</span>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="overflow-x-scroll hide-scrollbar">
                <table class="w-full text-left border-collapse">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Order ID</th>
                            <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                            <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                            <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                            <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                            <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50 transition-colors">
                            <td class="px-6 py-4 font-medium text-gray-700">{{ order.id }}</td>
                            <td class="px-6 py-4 text-gray-600">{{ order.customer }}</td>
                            <td class="px-6 py-4 text-gray-500 text-sm">{{ order.date }}</td>
                            <td class="px-6 py-4 font-bold text-gray-800">Rs.{{ order.total.toFixed() }}</td>
                            <td class="px-6 py-4">
                                <span :class="getStatusClass(order.status)" class="px-3 py-1 rounded-full text-xs font-bold">
                                    {{ order.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4">
                                <select 
                                    v-model="order.status"
                                    class="text-xs border rounded-lg p-1.5 focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer bg-white"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
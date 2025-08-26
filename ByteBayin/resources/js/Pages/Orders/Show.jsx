import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const OrdersShow = () => {
    const { order } = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <Link 
                                href={route('orders.index')}
                                className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
                            >
                                &larr; Back to Orders
                            </Link>
                            
                            <h1 className="text-2xl font-bold mb-6">Order Details #{order.orderId}</h1>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold mb-2">Order Information</h2>
                                    <p><strong>Order Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                                    <p><strong>Status:</strong> 
                                        <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                                            'bg-yellow-100 text-yellow-800'}`}>
                                            {order.status}
                                        </span>
                                    </p>
                                    <p><strong>Total Amount:</strong> ${parseFloat(order.totalAmount).toFixed(2)}</p>
                                </div>
                            </div>
                            
                            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Product
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Price
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Quantity
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Subtotal
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {order.items.map((item) => (
                                            <tr key={item.productId}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        ${parseFloat(item.price).toFixed(2)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{item.quantity}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        ${parseFloat(item.price * item.quantity).toFixed(2)}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="3" className="px-6 py-4 text-right font-semibold">Total:</td>
                                            <td className="px-6 py-4 font-semibold">
                                                ${parseFloat(order.totalAmount).toFixed(2)}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default OrdersShow;
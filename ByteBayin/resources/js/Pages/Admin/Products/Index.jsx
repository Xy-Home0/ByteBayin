import React, { useState } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const AdminProductsIndex = () => {
    const { products } = usePage().props;
    const [cart, setCart] = useState([]);

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        const items = cart.map(item => ({
            productId: item.productId, // Changed from productId to product_id
            quantity: item.quantity
        }));
        
        router.post(route('orders.store'), { items }, {
            onSuccess: () => {
                setCart([]);
                alert('Checkout successful! You can view your order under My Orders.');
            },
            onError: (errors) => {
                console.error('Checkout error:', errors);
                alert('There was an error processing your order. Please try again.');
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">Manage Products</h1>
                                <Link 
                                    href={route('admin.products.create')}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Create New Product
                                </Link>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Price
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Stock
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {products.map((product) => (
                                            <tr key={product.productId}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        ${parseFloat(product.price).toFixed(2)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{product.stock}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link 
                                                        href={route('admin.products.edit', product.productId)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link 
                                                        href={route('admin.products.destroy', product.productId)}
                                                        method="delete"
                                                        as="button"
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminProductsIndex;
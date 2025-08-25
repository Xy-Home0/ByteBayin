import React, { useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const AdminProductsEdit = () => {
    const { product } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        name: product.name || '',
        price: product.price || '',
        stock: product.stock || '',
    });

    useEffect(() => {
        setData({
            name: product.name,
            price: product.price,
            stock: product.stock,
        });
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.products.update', product.productId));
    };

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {errors.name && <div className="text-red-600 mt-1">{errors.name}</div>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        id="price"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {errors.price && <div className="text-red-600 mt-1">{errors.price}</div>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                                        Stock
                                    </label>
                                    <input
                                        type="number"
                                        id="stock"
                                        value={data.stock}
                                        onChange={e => setData('stock', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {errors.stock && <div className="text-red-600 mt-1">{errors.stock}</div>}
                                </div>
                                
                                <div className="flex items-center justify-end space-x-4">
                                    <a
                                        href={route('admin.products.index')}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Cancel
                                    </a>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                    >
                                        Update Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminProductsEdit;
import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ErrorBoundary from '@/Components/ErrorBoundary';

const ProductsIndex = () => {
    const { products } = usePage().props;
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
        useEffect(() => {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 500);
            
            return () => clearTimeout(timer);
        }, []);
        
        if (isLoading) {
            return (
                <AuthenticatedLayout>
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                </AuthenticatedLayout>
            );
        }

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
    };

    return (
        <AuthenticatedLayout>
            <ErrorBoundary>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Products List */}
                            <div className="lg:col-span-2">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-6 bg-white border-b border-gray-200">
                                        <h1 className="text-2xl font-bold mb-6">Baybayin Merchandise</h1>
                                    
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {products.map((product) => (
                                                <div key={product.id} className="border rounded-lg p-4 flex flex-col">
                                                    <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                                    <p className="text-gray-600 mb-2">Price: ${product.price}</p>
                                                    <p className="text-gray-600 mb-4">Stock: {product.stock}</p>
                                                    <button 
                                                        onClick={() => addToCart(product)}
                                                        disabled={product.stock === 0}
                                                        className="mt-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                                    >
                                                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Shopping Cart */}
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg h-fit">
                                <div className="p-6 bg-white border-b border-gray-200">
                                    <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
                                
                                    {cart.length === 0 ? (
                                        <p className="text-gray-600">Your cart is empty.</p>
                                    ) : (
                                        <>
                                            <div className="space-y-4 mb-4">
                                                {cart.map((item, index) => (
                                                    <div key={index} className="flex justify-between items-center border-b pb-2">
                                                        <div>
                                                            <p className="font-semibold">{item.name}</p>
                                                            <p className="text-sm text-gray-600">${item.price}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        
                                            <div className="flex justify-between items-center mb-4">
                                                <p className="font-semibold">Total:</p>
                                                <p className="font-semibold">${getTotalPrice()}</p>
                                            </div>
                                        
                                            <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                                Checkout
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ErrorBoundary>
        </AuthenticatedLayout>
    );
};

export default ProductsIndex;
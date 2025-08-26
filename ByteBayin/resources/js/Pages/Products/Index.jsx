import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
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
        // Check if product is already in cart
        const existingItemIndex = cart.findIndex(item => item.productId === product.productId);
        
        if (existingItemIndex >= 0) {
            // Update quantity if already in cart
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += 1;
            setCart(updatedCart);
        } else {
            // Add new item to cart
            setCart([...cart, {
                productId: product.productId,
                name: product.name,
                price: product.price,
                quantity: 1
            }]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.productId !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        
        setCart(cart.map(item => 
            item.productId === productId 
                ? {...item, quantity: newQuantity} 
                : item
        ));
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        // Format items to match what the backend expects
        const items = cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        }));

        console.log('Checkout items:', items);
        
        // Send checkout request
        router.post(route('orders.store'), { items }, {
            onSuccess: () => {
                setCart([]); // Clear cart on success
                router.visit(route('orders.index'));
            },
            onError: (error) => {
                console.error('Checkout error:', error);
                alert('There was an error processing your order. Please try again.');
            }
        });
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
                                                <div key={product.productId} className="border rounded-lg p-4 flex flex-col">
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
                                                {cart.map((item) => (
                                                    <div key={item.productId} className="flex justify-between items-center border-b pb-2">
                                                        <div className="flex-1">
                                                            <p className="font-semibold">{item.name}</p>
                                                            <p className="text-sm text-gray-600">${item.price} each</p>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                                className="text-gray-500 hover:text-gray-700"
                                                            >
                                                                -
                                                            </button>
                                                            <span>{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                                className="text-gray-500 hover:text-gray-700"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <div className="ml-4">
                                                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => removeFromCart(item.productId)}
                                                            className="text-red-500 hover:text-red-700 ml-4"
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
                                        
                                            <button 
                                                onClick={handleCheckout}
                                                className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                            >
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
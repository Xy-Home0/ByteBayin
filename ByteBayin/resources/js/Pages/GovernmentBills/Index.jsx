import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ErrorBoundary from '@/Components/ErrorBoundary';

const GovernmentBillsIndex = () => {
    const { bills } = usePage().props;
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

    return (
        <AuthenticatedLayout>
            <ErrorBoundary>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                <h1 className="text-2xl font-bold mb-6">Government Bills Related to Baybayin</h1>
                                
                                <div className="space-y-6">
                                    {bills && bills.length > 0 ? (
                                        bills.map((bill, index) => (
                                            <div key={index} className="border rounded-lg p-4">
                                                <h2 className="text-xl font-semibold mb-2">{bill.title}</h2>
                                                <p className="text-gray-600 mb-2">Bill Number: {bill.number}</p>
                                                <p className="text-gray-600 mb-2">Status: {bill.status}</p>
                                                <p className="text-gray-600 mb-4">Introduced: {bill.date}</p>
                                                <p className="whitespace-pre-line">{bill.summary}</p>
                                                {bill.link && (
                                                    <a 
                                                        href={bill.link} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="inline-block mt-4 text-blue-500 hover:text-blue-700"
                                                    >
                                                        Read Full Bill
                                                    </a>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-600">No government bills available at this time.</p>
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

export default GovernmentBillsIndex;
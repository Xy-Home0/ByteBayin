import React, { useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ErrorBoundary from '@/Components/ErrorBoundary';

const LessonsIndex = () => {
    const { lessons } = usePage().props;
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
                                <h1 className="text-2xl font-bold mb-6">Baybayin Lessons</h1>
                            
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {lessons.map((lesson) => (
                                        <div key={lesson.id} className="bg-gray-50 p-4 rounded-lg shadow">
                                            <h2 className="text-xl font-semibold mb-2">{lesson.title}</h2>
                                            <p className="text-gray-600 mb-4">
                                                {lesson.content.substring(0, 100)}...
                                            </p>
                                            <Link 
                                                href={route('lessons.show', { lesson })}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                View Lesson
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ErrorBoundary>
        </AuthenticatedLayout>
    );
};

export default LessonsIndex;
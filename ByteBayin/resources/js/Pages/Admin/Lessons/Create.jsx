import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const AdminLessonsCreate = () => {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.lessons.store'));
    };

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1 className="text-2xl font-bold mb-6">Create New Lesson</h1>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    {errors.title && <div className="text-red-600 mt-1">{errors.title}</div>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                        Content
                                    </label>
                                    <textarea
                                        id="content"
                                        rows="10"
                                        value={data.content}
                                        onChange={e => setData('content', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    ></textarea>
                                    {errors.content && <div className="text-red-600 mt-1">{errors.content}</div>}
                                </div>
                                
                                <div className="flex items-center justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                    >
                                        Create Lesson
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

export default AdminLessonsCreate;
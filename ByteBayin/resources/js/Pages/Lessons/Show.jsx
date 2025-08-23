import React, { useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ErrorBoundary from '@/Components/ErrorBoundary';

const LessonsShow = () => {
    const { lesson } = usePage().props;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
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

    if (!lesson.exercise) {
        return (
            <AuthenticatedLayout>
                <ErrorBoundary>
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 bg-white border-b border-gray-200">
                                    <Link 
                                        href={route('lessons.index')}
                                        className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
                                    >
                                        &larr; Back to Lessons
                                    </Link>
                                
                                    <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>
                                
                                    <div className="prose max-w-none">
                                        <p className="whitespace-pre-line">{lesson.content}</p>
                                    </div>
                                
                                    <div className="mt-8 p-4 bg-yellow-100 rounded-lg">
                                        <p>No exercise available for this lesson yet.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ErrorBoundary>
            </AuthenticatedLayout>
        );
    }

    const questions = lesson.exercise.questions;
    const answers = lesson.exercise.answers;

    const handleAnswerSelect = (answer) => {
        setUserAnswers({
            ...userAnswers,
            [currentQuestion]: answer
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Calculate score
            let correctAnswers = 0;
            for (let i = 0; i < questions.length; i++) {
                if (userAnswers[i] === answers[i]) {
                    correctAnswers++;
                }
            }
            setScore(correctAnswers);
            setShowResults(true);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const resetExercise = () => {
        setCurrentQuestion(0);
        setUserAnswers({});
        setShowResults(false);
        setScore(0);
    };

    return (
        <AuthenticatedLayout>
            <ErrorBoundary>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                <Link 
                                    href={route('lessons.index')}
                                    className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
                                >
                                    &larr; Back to Lessons
                                </Link>
                            
                                <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>
                            
                                <div className="prose max-w-none mb-8">
                                    <p className="whitespace-pre-line">{lesson.content}</p>
                                </div>
                            
                                {lesson.exercise && (
                                    <div className="mt-8">
                                        <h2 className="text-2xl font-semibold mb-4">Exercise</h2>
                                    
                                        {showResults ? (
                                            <div className="bg-gray-50 p-6 rounded-lg">
                                                <h3 className="text-xl font-semibold mb-4">Exercise Results</h3>
                                                <p className="text-lg mb-4">
                                                    You scored {score} out of {questions.length} questions correctly.
                                                </p>
                                                <button
                                                    onClick={resetExercise}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Try Again
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="bg-gray-50 p-6 rounded-lg">
                                                <div className="mb-4">
                                                    <span className="text-sm text-gray-600">
                                                        Question {currentQuestion + 1} of {questions.length}
                                                    </span>
                                                </div>
                                            
                                                <h3 className="text-xl font-semibold mb-4">
                                                    {questions[currentQuestion]}
                                                </h3>
                                            
                                                <div className="space-y-2 mb-6">
                                                    {['A', 'B', 'C', 'D'].map((option, index) => (
                                                        <div key={index} className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                id={`option-${index}`}
                                                                name="answer"
                                                                value={option}
                                                                checked={userAnswers[currentQuestion] === option}
                                                                onChange={() => handleAnswerSelect(option)}
                                                                className="mr-2"
                                                            />
                                                            <label htmlFor={`option-${index}`} className="cursor-pointer">
                                                                Option {option}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            
                                                <div className="flex justify-between">
                                                    <button
                                                        onClick={handlePreviousQuestion}
                                                        disabled={currentQuestion === 0}
                                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                                    >
                                                        Previous
                                                    </button>
                                                    <button
                                                        onClick={handleNextQuestion}
                                                        disabled={!userAnswers[currentQuestion]}
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                                    >
                                                        {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </ErrorBoundary>
        </AuthenticatedLayout>
    );
};

export default LessonsShow;
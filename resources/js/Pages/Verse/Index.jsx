import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Index({ verse: initialVerse, debug }) {
    const { translations } = usePage().props;
    const [verse, setVerse] = useState(initialVerse);
    const [loading, setLoading] = useState(false);

    // Log inicial para depuración
    console.log('Initial props:', { initialVerse, debug, translations });

    useEffect(() => {
        console.log('Current verse state:', verse);
    }, [verse]);

    const refreshVerse = async () => {
        setLoading(true);
        try {
            const response = await fetch('/verso/refresh');
            const data = await response.json();
            console.log('New verse data:', data);
            if (data) {
                setVerse(data);
            }
        } catch (error) {
            console.error('Error refreshing verse:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!verse) {
        console.log('No verse data available');
        return (
            <AppLayout>
                <div className="max-w-2xl mx-auto p-6">
                    <div className="text-red-500 p-4 text-center">
                        No verse available
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto p-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                    {translations.messages.verse.title}
                </h1>

                {verse.error ? (
                    <div className="text-red-500 p-4 text-center">
                        {verse.message}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
                        <div className="space-y-4">
                            <blockquote className="text-xl text-gray-700 dark:text-gray-300 italic">
                                "{verse.text}"
                            </blockquote>
                            
                            <div className="text-right">
                                <p className="text-gray-600 dark:text-gray-400">
                                    {verse.reference} - {verse.translation}
                                </p>
                            </div>

                            <button
                                onClick={refreshVerse}
                                disabled={loading}
                                className={`mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors duration-300 ${
                                    loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {translations.messages.verse.loading}
                                    </span>
                                ) : translations.messages.verse.new_verse}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
} 
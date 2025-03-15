import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { getBibleVerse, getRandomVerse } from '@/Services/BibleService';

export default function VerseDisplay() {
    const { locale, translations } = usePage().props;
    const [verse, setVerse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadRandomVerse();
    }, [locale]); // Recargar cuando cambie el idioma

    const loadRandomVerse = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const verseData = await getRandomVerse(locale);
            if (verseData) {
                setVerse(verseData);
            } else {
                setError('Error loading verse');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 p-4 text-center">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl">
            <div className="space-y-4">
                <blockquote className="text-xl text-gray-300 italic">
                    "{verse?.text}"
                </blockquote>
                
                <div className="text-right">
                    <p className="text-gray-400">
                        {verse?.reference} - {verse?.translation}
                    </p>
                </div>

                <button
                    onClick={loadRandomVerse}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors duration-300"
                >
                    {translations.messages.verse.new_verse || 'New Verse'}
                </button>
            </div>
        </div>
    );
} 
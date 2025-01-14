import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VerseOfTheDay = () => {
    const [verse, setVerse] = useState(null);

    useEffect(() => {
        axios.get('/api/verse-of-the-day').then((response) => {
            setVerse(response.data);
        });
    }, []);

    const addToFavorites = () => {
        axios.post('/api/favorites', { verse_id: verse.id }).then(() => {
            alert('Added to favorites!');
        });
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
            {verse ? (
                <div>
                    <h2 className="text-lg font-bold">{verse.reference}</h2>
                    <p className="text-gray-700">{verse.text}</p>
                    <button
                        onClick={addToFavorites}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Add to Favorites
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default VerseOfTheDay;

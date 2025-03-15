const BASE_URL = 'https://bible-api.com';

export const getBibleVerse = async (reference, locale = 'en') => {
    try {
        const translation = locale === 'en' ? 'kjv' : 'web';
        const response = await fetch(`${BASE_URL}/${reference}?translation=${translation}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return {
            text: data.text,
            reference: data.reference,
            translation: data.translation_name,
            book_name: data.book_name,
            chapter: data.chapter,
            verse: data.verse
        };
    } catch (error) {
        console.error('Error fetching Bible verse:', error);
        return null;
    }
};

export const getRandomVerse = async (locale = 'en') => {
    try {
        const translation = locale === 'en' ? 'kjv' : 'web';
        const response = await fetch(`${BASE_URL}/data/${translation}/random/NT`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Una vez que tenemos la referencia aleatoria, obtenemos el versículo completo
        return await getBibleVerse(`${data.book_name}+${data.chapter}:${data.verse}`, locale);
    } catch (error) {
        console.error('Error fetching random verse:', error);
        return null;
    }
}; 
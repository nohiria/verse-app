<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

/**
 * Controller for handling Bible verse operations.
 * 
 * This controller manages the retrieval and caching of daily Bible verses
 * in multiple translations (Spanish and English).
 */
class VerseController extends Controller
{
    /**
     * Base URL for the Spanish Bible API.
     *
     * @var string
     */
    protected $baseUrl = 'https://bible-api.deno.dev/api/read';

    /**
     * Base URL for the English Bible API.
     *
     * @var string
     */
    protected $bibleApiUrl = 'https://bible-api.com';

    /**
     * Available books with their configurations.
     * Each book contains:
     * - name: Spanish name of the book
     * - chapters: Total number of chapters
     * - en: English name of the book
     *
     * @var array
     */
    protected $books = [
        ['name' => 'salmos', 'chapters' => 150, 'en' => 'psalm'],
        ['name' => 'proverbios', 'chapters' => 31, 'en' => 'proverbs'],
        ['name' => 'mateo', 'chapters' => 28, 'en' => 'matthew'],
        ['name' => 'juan', 'chapters' => 21, 'en' => 'john'],
        ['name' => 'romanos', 'chapters' => 16, 'en' => 'romans'],
        ['name' => 'filipenses', 'chapters' => 4, 'en' => 'philippians']
    ];

    /**
     * Refresh the daily verse.
     * Returns a cached verse or fetches a new one if cache has expired.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh(Request $request)
    {
        try {
            return response()->json(
                Cache::remember('verse_of_the_day', $this->getCacheExpiration(), fn() => $this->getVerse())
            );
        } catch (\Exception $e) {
            Log::error('Error fetching verse', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'error' => true,
                'message' => 'Error al obtener el versículo'
            ], 500);
        }
    }

    public function index(Request $request)
    {
        try {
            $verse = $this->getRandomVerse();
            return Inertia::render('Verse/Index', [
                'verse' => $verse
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in verse index:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return Inertia::render('Verse/Index', [
                'verse' => [
                    'error' => true,
                    'message' => __('messages.verse.error')
                ]
            ]);
        }
    }

    /**
     * Get a random verse with both translations.
     * 
     * @return array The verse data with translations
     * @throws \Exception If there's an error fetching the verse
     */
    protected function getVerse(): array
    {
        // Select random book and verse
        $book = $this->books[array_rand($this->books)];
        $chapter = rand(1, $book['chapters']);
        $verse = rand(1, 20);

        Log::info('Fetching verse', [
            'book' => $book['name'],
            'chapter' => $chapter,
            'verse' => $verse
        ]);

        // Get translations in parallel
        [$esVerse, $enVerse] = $this->fetchTranslations($book, $chapter, $verse);

        return [
            'verse_id' => "{$book['name']}.{$chapter}.{$verse}",
            'available_translations' => [
                'es' => [
                    'text' => $esVerse['text'] ?? $esVerse['verse'] ?? 'Texto no disponible',
                    'reference' => ucfirst($book['name']) . " {$chapter}:{$verse}",
                    'translation' => 'NVI',
                    'book_name' => ucfirst($book['name']),
                    'chapter' => $chapter,
                    'verse' => $verse
                ],
                'en' => [
                    'text' => trim($enVerse['text'] ?? 'Text not available'),
                    'reference' => $enVerse['reference'] ?? ucfirst($book['en']) . " {$chapter}:{$verse}",
                    'translation' => 'KJV',
                    'book_name' => ucfirst($book['en']),
                    'chapter' => $chapter,
                    'verse' => $verse
                ]
            ]
        ];
    }

    /**
     * Fetch translations for a specific verse from both APIs.
     *
     * @param array $book Book information
     * @param int $chapter Chapter number
     * @param int $verse Verse number
     * @return array Array containing [Spanish verse, English verse]
     * @throws \Exception If either API request fails
     */
    protected function fetchTranslations(array $book, int $chapter, int $verse): array
    {
        $responses = Http::pool(fn ($pool) => [
            $pool->get("{$this->baseUrl}/nvi/{$book['name']}/{$chapter}/{$verse}"),
            $pool->get("{$this->bibleApiUrl}/{$book['en']}%20{$chapter}:{$verse}?translation=kjv")
        ]);

        if (!$responses[0]->successful()) {
            throw new \Exception("Error fetching Spanish verse: {$responses[0]->body()}");
        }

        if (!$responses[1]->successful()) {
            throw new \Exception("Error fetching English verse: {$responses[1]->body()}");
        }

        return [
            $responses[0]->json(),
            $responses[1]->json()
        ];
    }

    /**
     * Calculate the cache expiration time (minutes until end of day).
     *
     * @return int Minutes until end of day
     */
    protected function getCacheExpiration(): int
    {
        $endOfDay = now()->endOfDay();
        return now()->diffInMinutes($endOfDay);
    }
}

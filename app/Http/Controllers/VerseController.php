<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class VerseController extends Controller
{
    public function getVerseOfTheDay()
    {
        if (Cache::has('verse_of_the_day')) {
            return response()->json(Cache::get('verse_of_the_day'));
        }

        $books = [
            ['name' => 'salmos', 'chapters' => 150],
            ['name' => 'proverbios', 'chapters' => 31],
            ['name' => 'mateo', 'chapters' => 28],
            ['name' => 'juan', 'chapters' => 21],
            ['name' => 'romanos', 'chapters' => 16],
        ];

        $books = [
            ['name' => 'filipenses', 'chapters' => 4],
        ];

        $book = $books[array_rand($books)];
        $chapter = rand(1, $book['chapters']);
        $verse = rand(1, 20);

        $chapter = 4;
        $verse = 4;

        $url = "https://bible-api.deno.dev/api/read/nvi/filipenses/4/4";

        $response = Http::get($url);
        if ($response->failed()) {
            return response()->json(['error' => 'Failed to fetch the verse'], 500);
        }

        $verseData = [
            'text' => $response->json()['verse'],
            'book' => ucfirst($book['name']),
            'chapter' => $chapter,
            'verse' => $verse,
        ];

        Cache::put('verse_of_the_day', $verseData, now()->endOfDay());

        return response()->json($verseData);
    }
}

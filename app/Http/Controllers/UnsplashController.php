<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class UnsplashController extends Controller
{
    public function getRandomImage()
    {
        $cacheKey = 'image-of-the-day' . Carbon::now()->toDateString();

        if (Cache::has($cacheKey)) {
            return response()->json(Cache::get($cacheKey));
        }

        $response = Http::get(config('services.unsplash.base_url') . 'photos/random?query=landscape', [
            'client_id' => config('services.unsplash.access_key'),
            'query' => 'landscape',
        ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to fetch the image'], 500);
        }

        $imageData = $response->json();
        Cache::put($cacheKey, $imageData, now()->endOfDay());

        return response()->json($imageData);
    }
}
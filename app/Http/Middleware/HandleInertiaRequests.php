<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $locale = app()->getLocale();
        $messagesPath = base_path('lang/' . $locale . '/messages.php');
        
        // Debug
        \Log::info('Loading translations from:', ['path' => $messagesPath]);
        \Log::info('Current locale:', ['locale' => $locale]);
        
        if (!file_exists($messagesPath)) {
            \Log::error('Translation file not found:', ['path' => $messagesPath]);
            $messages = [];
        } else {
            $messages = require $messagesPath;
            \Log::info('Loaded messages:', $messages);
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'locale' => $locale,
            'translations' => [
                'messages' => $messages
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message')
            ],
        ]);
    }
}

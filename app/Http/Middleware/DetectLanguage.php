<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

/**
 * Language Detection Middleware
 *
 * Detects and sets the application's locale based on multiple sources
 * with the following priority:
 * 1. URL parameter ('lang')
 * 2. Session storage
 * 3. Browser preferences
 * 4. Application default
 *
 * @package App\Http\Middleware
 */
class DetectLanguage
{
    /**
     * List of supported language codes
     *
     * @var array<string>
     */
    protected $availableLanguages = ['es', 'en'];

    /**
     * Handle an incoming request
     *
     * Processes the request and determines the appropriate locale
     * based on multiple sources. Sets the detected locale for the
     * current request and stores it in the session.
     *
     * @param Request $request The incoming HTTP request
     * @param Closure $next The next middleware/handler
     * @return mixed The processed request
     */
    public function handle(Request $request, Closure $next)
    {
        $locale = $this->getLocaleFromSources($request, $this->availableLanguages);
        
        App::setLocale($locale);
        session(['locale' => $locale]);
        
        return $next($request);
    }

    /**
     * Determine the appropriate locale from available sources
     *
     * Checks multiple sources in order of priority to determine
     * the most appropriate locale for the current request.
     *
     * Priority order:
     * 1. URL parameter ('lang')
     * 2. Session storage
     * 3. Browser's Accept-Language header
     * 4. Application's fallback locale
     * 5. First available language as last resort
     *
     * @param Request $request The incoming HTTP request
     * @param array<string> $availableLanguages List of supported language codes
     * @return string The determined locale code
     */
    private function getLocaleFromSources(Request $request, array $availableLanguages): string
    {
        // Check URL parameter
        if ($request->has('lang') && in_array($request->get('lang'), $availableLanguages)) {
            return $request->get('lang');
        }

        // Check session storage
        if (session()->has('locale') && in_array(session('locale'), $availableLanguages)) {
            return session('locale');
        }

        // Parse browser's language preferences
        $browserLocales = explode(',', $request->server('HTTP_ACCEPT_LANGUAGE') ?? '');
        foreach ($browserLocales as $browserLocale) {
            // Extract language code and clean weight parameter
            $locale = substr(trim(explode(';', $browserLocale)[0]), 0, 2);
            if (in_array($locale, $availableLanguages)) {
                return $locale;
            }
        }

        // Use application's fallback locale
        $defaultLocale = config('app.fallback_locale', 'es');
        if (in_array($defaultLocale, $availableLanguages)) {
            return $defaultLocale;
        }

        // Fallback to first available language
        return $availableLanguages[0];
    }
}

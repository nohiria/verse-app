<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VerseController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/verso', [VerseController::class, 'index'])->name('verso');
Route::get('/verso/refresh', [VerseController::class, 'refresh'])->name('verso.refresh');

Route::get('/contacto', function () {
    return Inertia::render('Contacto');
})->name('contacto');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Elimina o comenta estas rutas si no las estás usando
// Route::middleware(['auth'])->group(function () {
//     Route::get('/verse', [VerseController::class, 'index'])->name('verse.index');
//     Route::get('/verse/refresh', [VerseController::class, 'refresh'])->name('verse.refresh');
// });

// Comentar o eliminar estas rutas si existen
// Route::get('/api/verse-of-the-day', [VerseController::class, 'getVerseOfTheDay']);
// Route::get('/verse', [VerseController::class, 'index'])->name('verse.index');
// Route::get('/verse/refresh', [VerseController::class, 'refresh'])->name('verse.refresh');

require __DIR__.'/auth.php';

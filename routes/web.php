<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\DeadlineController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\TrieController;

use Illuminate\Support\Facades\Auth;

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard',[HomeController::class, 'index'])->middleware('auth')->name('dashboard');

//home
Route::get('/home', [HomeController::class, 'index'])->middleware('auth')->name('home');

//student
Route::get('/ispiti', [HomeController::class, 'ispiti'])->middleware('auth')->name('ispiti');

//admin
Route::get('/rokovi', [HomeController::class, 'rokovi'])->middleware('auth')->name('rokovi');
Route::get('/ocijene', [HomeController::class, 'ocijene'])->middleware('auth')->name('ocijene');

//Courses
Route::get('/addcourse', [CoursesController::class, 'addCourse'])->name('addcourse');
Route::get('/deletecourse',[CoursesController::class, 'deleteCourse'])->name('deletecourse');

//dealdines
Route::get('/adddeadline',[DeadlineController::class, 'createDeadline'])->name('adddeadline');
Route::get('/deletedeadline',[DeadlineController::class, 'deleteDeadline'])->name('deletedeadline');

//grades
Route::get('/addgrade',[GradeController::class, 'createGrade'])->name('addgrade');
Route::get('/deletegrade',[GradeController::class, 'deleteGrade'])->name('deletegrade');

//tries
Route::get('/addtrie',[TrieController::class, 'createTrie'])->name('addtrie');
Route::get('/deletetrie',[TrieController::class, 'deleteTrie'])->name('deletetrie');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

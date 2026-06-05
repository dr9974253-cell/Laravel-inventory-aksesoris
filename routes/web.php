<?php

use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\StockInController;
use App\Http\Controllers\StockOutController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/login', [AuthController::class, 'showLogin'])->name('login')->middleware('guest');
Route::post('/login', [AuthController::class, 'login'])->middleware('guest');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Forgot Password Routes
Route::get('/forgot-password', [ResetPasswordController::class, 'showForm'])->name('password.request')->middleware('guest');
Route::post('/forgot-password', [ResetPasswordController::class, 'resetPassword'])->name('password.reset.custom')->middleware('guest');

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Admin Only Routes - Master Data
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    // Categories Routes
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    // Units Routes
    Route::get('/units', [UnitController::class, 'index'])->name('units.index');
    Route::post('/units', [UnitController::class, 'store'])->name('units.store');
    Route::put('/units/{unit}', [UnitController::class, 'update'])->name('units.update');
    Route::delete('/units/{unit}', [UnitController::class, 'destroy'])->name('units.destroy');

    // Suppliers Routes
    Route::get('/suppliers', [SupplierController::class, 'index'])->name('suppliers.index');
    Route::post('/suppliers', [SupplierController::class, 'store'])->name('suppliers.store');
    Route::put('/suppliers/{supplier}', [SupplierController::class, 'update'])->name('suppliers.update');
    Route::delete('/suppliers/{supplier}', [SupplierController::class, 'destroy'])->name('suppliers.destroy');

    // Users Routes
    Route::resource('users', UserController::class)->except(['show']);
});

// Products Routes - Admin only can create, update, delete
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/products/create', [ProductController::class, 'create'])
        ->middleware('admin')
        ->name('products.create');
    Route::post('/products', [ProductController::class, 'store'])
        ->middleware('admin')
        ->name('products.store');
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])
        ->middleware('admin')
        ->name('products.edit');
    Route::put('/products/{product}', [ProductController::class, 'update'])
        ->middleware('admin')
        ->name('products.update');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])
        ->middleware('admin')
        ->name('products.destroy');

    // Stock In Routes
    Route::get('/stock-ins', [StockInController::class, 'index'])->name('stock-ins.index');
    Route::get('/stock-ins/create', [StockInController::class, 'create'])
        ->middleware('admin')
        ->name('stock-ins.create');
    Route::post('/stock-ins', [StockInController::class, 'store'])
        ->middleware('admin')
        ->name('stock-ins.store');
    Route::delete('/stock-ins/{stockIn}', [StockInController::class, 'destroy'])
        ->middleware('admin')
        ->name('stock-ins.destroy');

    // Stock Out Routes
    Route::get('/stock-outs', [StockOutController::class, 'index'])->name('stock-outs.index');
    Route::get('/stock-outs/create', [StockOutController::class, 'create'])
        ->middleware('admin')
        ->name('stock-outs.create');
    Route::post('/stock-outs', [StockOutController::class, 'store'])
        ->middleware('admin')
        ->name('stock-outs.store');
    Route::delete('/stock-outs/{stockOut}', [StockOutController::class, 'destroy'])
        ->middleware('admin')
        ->name('stock-outs.destroy');

    // Reports Routes
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/reports/data', [ReportController::class, 'data'])->name('reports.data');
    Route::get('/reports/export', [ReportController::class, 'export'])->name('reports.export');
    Route::get('/reports/print-pdf', [ReportController::class, 'printPdf'])->name('reports.printPdf');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::put('/profile/password', [App\Http\Controllers\Auth\PasswordController::class, 'update'])->name('password.update');
});

// Routes auth bawaan dinonaktifkan - menggunakan custom login page
// require __DIR__.'/auth.php';
<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');

        $categories = Category::when($search, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama_kategori', 'like', "%{$search}%")
                    ->orWhere('kode_kategori', 'like', "%{$search}%");
            });
        })
            ->orderBy('kode_kategori')
            ->paginate(10)
            ->withQueryString();

        return inertia('Categories/Index', [
            'categories' => $categories,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode_kategori' => 'nullable|string|max:50|unique:categories,kode_kategori',
            'nama_kategori' => 'required|string|max:100',
            'deskripsi' => 'nullable|string',
        ]);

        // Auto generate kode_kategori if empty
        if (empty($validated['kode_kategori'])) {
            $lastCategory = Category::orderBy('id', 'desc')->first();
            $lastNumber = $lastCategory ? (int) substr($lastCategory->kode_kategori, 3) : 0;
            $validated['kode_kategori'] = 'KAT' . str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);
        }

        Category::create($validated);

        return Redirect::route('categories.index')->with('success', 'Kategori berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'kode_kategori' => 'required|string|max:50|unique:categories,kode_kategori,' . $category->id,
            'nama_kategori' => 'required|string|max:100',
            'deskripsi' => 'nullable|string',
        ]);

        $category->update($validated);

        return Redirect::route('categories.index')->with('success', 'Kategori berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        // Check if category is still used by products
        $productCount = $category->products()->count();
        if ($productCount > 0) {
            return Redirect::back()->with('error', "Kategori masih digunakan oleh {$productCount} produk.");
        }

        $category->delete();

        return Redirect::route('categories.index')->with('success', 'Kategori berhasil dihapus.');
    }
}
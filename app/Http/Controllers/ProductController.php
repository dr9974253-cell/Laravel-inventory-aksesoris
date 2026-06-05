<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');

        $products = Product::with(['category', 'unit'])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('nama_barang', 'like', "%{$search}%")
                        ->orWhere('kode_barang', 'like', "%{$search}%");
                });
            })
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::orderBy('nama_kategori')->get(['id', 'kode_kategori', 'nama_kategori']);
        $units = Unit::orderBy('nama_satuan')->get(['id', 'kode_satuan', 'nama_satuan']);

        return Inertia::render('Products/Create', [
            'categories' => $categories,
            'units' => $units,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode_barang' => 'required|string|max:50|unique:products,kode_barang',
            'nama_barang' => 'required|string|max:100',
            'category_id' => 'required|exists:categories,id',
            'unit_id' => 'required|exists:units,id',
            'stok' => 'required|integer|min:0',
            'stok_minimum' => 'required|integer|min:0',
            'harga_beli' => 'nullable|numeric|min:0',
            'harga_jual' => 'nullable|numeric|min:0',
            'keterangan' => 'nullable|string',
        ]);

        Product::create($validated);

        return Redirect::route('products.index')->with('success', 'Produk berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::orderBy('nama_kategori')->get(['id', 'kode_kategori', 'nama_kategori']);
        $units = Unit::orderBy('nama_satuan')->get(['id', 'kode_satuan', 'nama_satuan']);

        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => $categories,
            'units' => $units,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'kode_barang' => 'required|string|max:50|unique:products,kode_barang,' . $product->id,
            'nama_barang' => 'required|string|max:100',
            'category_id' => 'required|exists:categories,id',
            'unit_id' => 'required|exists:units,id',
            'stok' => 'required|integer|min:0',
            'stok_minimum' => 'required|integer|min:0',
            'harga_beli' => 'nullable|numeric|min:0',
            'harga_jual' => 'nullable|numeric|min:0',
            'keterangan' => 'nullable|string',
        ]);

        $product->update($validated);

        return Redirect::route('products.index')->with('success', 'Produk berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return Redirect::route('products.index')->with('success', 'Produk berhasil dihapus.');
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StockOut;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class StockOutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');

        $stockOuts = StockOut::with('product')
            ->when($search, function ($query, $search) {
                $query->whereHas('product', function ($q) use ($search) {
                    $q->where('nama_barang', 'like', "%{$search}%")
                        ->orWhere('kode_barang', 'like', "%{$search}%");
                })
                ->orWhere('tanggal', 'like', "%{$search}%")
                ->orWhere('no_referensi', 'like', "%{$search}%");
            })
            ->orderBy('tanggal', 'desc')
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('StockOuts/Index', [
            'stockOuts' => $stockOuts,
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
        $products = Product::select('id', 'kode_barang', 'nama_barang', 'stok')
            ->orderBy('nama_barang')
            ->get();

        return Inertia::render('StockOuts/Create', [
            'products' => $products,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'jumlah' => 'required|integer|min:1',
            'tanggal' => 'required|date',
            'no_referensi' => 'nullable|string|max:100',
            'keterangan' => 'nullable|string|max:255',
        ]);

        // Check if stock is sufficient
        $product = Product::find($validated['product_id']);
        if ($product->stok < $validated['jumlah']) {
            return Redirect::back()->withErrors([
                'jumlah' => 'Stok tidak mencukupi. Stok tersedia: ' . $product->stok,
            ])->with('error', 'Stok tidak mencukupi.');
        }

        DB::transaction(function () use ($validated) {
            // Create stock out record
            $stockOut = StockOut::create($validated);

            // Update product stock (decrement)
            $product = Product::find($validated['product_id']);
            $product->decrement('stok', $validated['jumlah']);
        });

        return Redirect::route('stock-outs.index')->with('success', 'Barang keluar berhasil dicatat.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StockOut $stockOut)
    {
        DB::transaction(function () use ($stockOut) {
            // Return stock to product
            $product = Product::find($stockOut->product_id);
            $product->increment('stok', $stockOut->jumlah);

            // Delete stock out record
            $stockOut->delete();
        });

        return Redirect::route('stock-outs.index')->with('success', 'Data barang keluar berhasil dihapus.');
    }
}
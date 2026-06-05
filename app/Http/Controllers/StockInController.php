<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StockIn;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class StockInController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');

        $stockIns = StockIn::with(['product', 'supplier'])
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

        return Inertia::render('StockIns/Index', [
            'stockIns' => $stockIns,
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

        $suppliers = Supplier::orderBy('nama_supplier')->get(['id', 'kode_supplier', 'nama_supplier']);

        return Inertia::render('StockIns/Create', [
            'products' => $products,
            'suppliers' => $suppliers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'jumlah' => 'required|integer|min:1',
            'tanggal' => 'required|date',
            'no_referensi' => 'nullable|string|max:100',
            'keterangan' => 'nullable|string|max:255',
        ]);

        DB::transaction(function () use ($validated) {
            // Create stock in record
            $stockIn = StockIn::create($validated);

            // Update product stock
            $product = Product::find($validated['product_id']);
            $product->increment('stok', $validated['jumlah']);
        });

        return Redirect::route('stock-ins.index')->with('success', 'Barang masuk berhasil dicatat.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StockIn $stockIn)
    {
        DB::transaction(function () use ($stockIn) {
            // Return stock to product
            $product = Product::find($stockIn->product_id);
            $product->decrement('stok', $stockIn->jumlah);

            // Delete stock in record
            $stockIn->delete();
        });

        return Redirect::route('stock-ins.index')->with('success', 'Data barang masuk berhasil dihapus.');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');

        $suppliers = Supplier::when($search, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama_supplier', 'like', "%{$search}%")
                    ->orWhere('kode_supplier', 'like', "%{$search}%");
            });
        })
            ->orderBy('kode_supplier')
            ->paginate(10)
            ->withQueryString();

        return inertia('Suppliers/Index', [
            'suppliers' => $suppliers,
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
            'kode_supplier' => 'nullable|string|max:50|unique:suppliers,kode_supplier',
            'nama_supplier' => 'required|string|max:100',
            'telepon' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
            'alamat' => 'nullable|string',
            'keterangan' => 'nullable|string',
        ]);

        // Auto generate kode_supplier if empty
        if (empty($validated['kode_supplier'])) {
            $lastSupplier = Supplier::orderBy('id', 'desc')->first();
            $lastNumber = $lastSupplier ? (int) substr($lastSupplier->kode_supplier, 3) : 0;
            $validated['kode_supplier'] = 'SUP' . str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);
        }

        Supplier::create($validated);

        return Redirect::route('suppliers.index')->with('success', 'Supplier berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Supplier $supplier)
    {
        $validated = $request->validate([
            'kode_supplier' => 'required|string|max:50|unique:suppliers,kode_supplier,' . $supplier->id,
            'nama_supplier' => 'required|string|max:100',
            'telepon' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
            'alamat' => 'nullable|string',
            'keterangan' => 'nullable|string',
        ]);

        $supplier->update($validated);

        return Redirect::route('suppliers.index')->with('success', 'Supplier berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supplier $supplier)
    {
        // Check if supplier is still used in stock_ins
        $stockInCount = $supplier->stockIns()->count();
        if ($stockInCount > 0) {
            return Redirect::back()->with('error', "Supplier masih memiliki {$stockInCount} riwayat transaksi.");
        }

        $supplier->delete();

        return Redirect::route('suppliers.index')->with('success', 'Supplier berhasil dihapus.');
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');

        $units = Unit::when($search, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->where('nama_satuan', 'like', "%{$search}%")
                    ->orWhere('kode_satuan', 'like', "%{$search}%");
            });
        })
            ->orderBy('kode_satuan')
            ->paginate(10)
            ->withQueryString();

        return inertia('Units/Index', [
            'units' => $units,
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
            'kode_satuan' => 'nullable|string|max:50|unique:units,kode_satuan',
            'nama_satuan' => 'required|string|max:100',
            'deskripsi' => 'nullable|string',
        ]);

        // Auto generate kode_satuan if empty
        if (empty($validated['kode_satuan'])) {
            $lastUnit = Unit::orderBy('id', 'desc')->first();
            $lastNumber = $lastUnit ? (int) substr($lastUnit->kode_satuan, 3) : 0;
            $validated['kode_satuan'] = 'SAT' . str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);
        }

        Unit::create($validated);

        return Redirect::route('units.index')->with('success', 'Satuan berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Unit $unit)
    {
        $validated = $request->validate([
            'kode_satuan' => 'required|string|max:50|unique:units,kode_satuan,' . $unit->id,
            'nama_satuan' => 'required|string|max:100',
            'deskripsi' => 'nullable|string',
        ]);

        $unit->update($validated);

        return Redirect::route('units.index')->with('success', 'Satuan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Unit $unit)
    {
        // Check if unit is still used by products
        $productCount = $unit->products()->count();
        if ($productCount > 0) {
            return Redirect::back()->with('error', "Satuan masih digunakan oleh {$productCount} produk.");
        }

        $unit->delete();

        return Redirect::route('units.index')->with('success', 'Satuan berhasil dihapus.');
    }
}
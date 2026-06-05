<?php

namespace App\Http\Controllers;

use App\Exports\StockReportExport;
use App\Models\Product;
use App\Models\StockIn;
use App\Models\StockOut;
use App\Services\ReportPdfService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    /**
     * Display the reports page.
     */
    public function index(Request $request)
    {
        $products = Product::select('id', 'kode_barang', 'nama_barang')
            ->orderBy('nama_barang')
            ->get();

        return Inertia::render('Reports/Index', [
            'products' => $products,
        ]);
    }

    /**
     * Get report data as JSON.
     */
    public function data(Request $request)
    {
        $validated = $request->validate([
            'tanggal_mulai' => 'nullable|date',
            'tanggal_selesai' => 'nullable|date',
            'jenis' => 'nullable|in:semua,masuk,keluar',
            'product_id' => 'nullable|exists:products,id',
        ]);

        $tanggalMulai = $validated['tanggal_mulai'] ?? now()->startOfMonth()->format('Y-m-d');
        $tanggalSelesai = $validated['tanggal_selesai'] ?? now()->endOfMonth()->format('Y-m-d');
        $jenis = $validated['jenis'] ?? 'semua';
        $productId = $validated['product_id'] ?? null;

        $transaksi = [];
        $totalMasuk = 0;
        $totalKeluar = 0;

        // Get stock ins
        if ($jenis === 'semua' || $jenis === 'masuk') {
            $stockInsQuery = StockIn::with('product')
                ->whereBetween('tanggal', [$tanggalMulai, $tanggalSelesai]);

            if ($productId) {
                $stockInsQuery->where('product_id', $productId);
            }

            $stockIns = $stockInsQuery->orderBy('tanggal', 'desc')->get();

            foreach ($stockIns as $item) {
                $transaksi[] = [
                    'id' => $item->id,
                    'tanggal' => $item->tanggal->format('Y-m-d'),
                    'jenis' => 'masuk',
                    'product_id' => $item->product_id,
                    'kode_barang' => $item->product->kode_barang,
                    'nama_barang' => $item->product->nama_barang,
                    'jumlah' => $item->jumlah,
                    'no_referensi' => $item->no_referensi,
                    'keterangan' => $item->keterangan,
                ];
                $totalMasuk += $item->jumlah;
            }
        }

        // Get stock outs
        if ($jenis === 'semua' || $jenis === 'keluar') {
            $stockOutsQuery = StockOut::with('product')
                ->whereBetween('tanggal', [$tanggalMulai, $tanggalSelesai]);

            if ($productId) {
                $stockOutsQuery->where('product_id', $productId);
            }

            $stockOuts = $stockOutsQuery->orderBy('tanggal', 'desc')->get();

            foreach ($stockOuts as $item) {
                $transaksi[] = [
                    'id' => $item->id,
                    'tanggal' => $item->tanggal->format('Y-m-d'),
                    'jenis' => 'keluar',
                    'product_id' => $item->product_id,
                    'kode_barang' => $item->product->kode_barang,
                    'nama_barang' => $item->product->nama_barang,
                    'jumlah' => $item->jumlah,
                    'no_referensi' => $item->no_referensi,
                    'keterangan' => $item->keterangan,
                ];
                $totalKeluar += $item->jumlah;
            }
        }

        // Sort by tanggal descending
        usort($transaksi, function ($a, $b) {
            return strcmp($b['tanggal'], $a['tanggal']);
        });

        // Calculate summary
        $totalProdukBergerak = $totalMasuk + $totalKeluar;

        return response()->json([
            'success' => true,
            'data' => [
                'transaksi' => $transaksi,
                'summary' => [
                    'total_masuk' => $totalMasuk,
                    'total_keluar' => $totalKeluar,
                    'total_produk_bergera' => $totalProdukBergerak,
                    'saldo' => $totalMasuk - $totalKeluar,
                ],
                'filter' => [
                    'tanggal_mulai' => $tanggalMulai,
                    'tanggal_selesai' => $tanggalSelesai,
                    'jenis' => $jenis,
                    'product_id' => $productId,
                ],
            ],
        ]);
    }

    /**
     * Export report data to Excel.
     */
    public function export(Request $request)
    {
        $validated = $request->validate([
            'tanggal_mulai' => 'nullable|date',
            'tanggal_selesai' => 'nullable|date',
            'jenis' => 'nullable|in:semua,masuk,keluar',
            'product_id' => 'nullable|exists:products,id',
        ]);

        $tanggalMulai = $validated['tanggal_mulai'] ?? now()->startOfMonth()->format('Y-m-d');
        $tanggalSelesai = $validated['tanggal_selesai'] ?? now()->endOfMonth()->format('Y-m-d');
        $jenis = $validated['jenis'] ?? 'semua';
        $productId = $validated['product_id'] ?? null;

        $filename = 'laporan-stok-' . date('Y-m-d') . '.xlsx';

        return Excel::download(
            new StockReportExport($tanggalMulai, $tanggalSelesai, $jenis, $productId),
            $filename
        );
    }

    /**
     * Print report data to PDF.
     */
    public function printPdf(Request $request)
    {
        $validated = $request->validate([
            'tanggal_mulai' => 'nullable|date',
            'tanggal_selesai' => 'nullable|date',
            'jenis' => 'nullable|in:semua,masuk,keluar',
            'product_id' => 'nullable|exists:products,id',
        ]);

        $tanggalMulai = $validated['tanggal_mulai'] ?? now()->startOfMonth()->format('Y-m-d');
        $tanggalSelesai = $validated['tanggal_selesai'] ?? now()->endOfMonth()->format('Y-m-d');
        $jenis = $validated['jenis'] ?? 'semua';
        $productId = $validated['product_id'] ?? null;

        $pdfService = new ReportPdfService();
        $pdf = $pdfService->generateStockReport($tanggalMulai, $tanggalSelesai, $jenis, $productId);

        $pdf->render();

        $filename = 'laporan-stok-' . date('Y-m-d-His') . '.pdf';

        return response($pdf->output(), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }
}
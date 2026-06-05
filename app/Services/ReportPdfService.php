<?php

namespace App\Services;

use App\Models\Product;
use App\Models\StockIn;
use App\Models\StockOut;
use Dompdf\Dompdf;
use Dompdf\Options;

class ReportPdfService
{
    /**
     * Generate PDF report for stock transactions.
     */
    public function generateStockReport($tanggalMulai, $tanggalSelesai, $jenis = 'semua', $productId = null)
    {
        $transaksi = $this->getTransaksiData($tanggalMulai, $tanggalSelesai, $jenis, $productId);

        $totalMasuk = $transaksi->where('jenis', 'masuk')->sum('jumlah');
        $totalKeluar = $transaksi->where('jenis', 'keluar')->sum('jumlah');
        $saldo = $totalMasuk - $totalKeluar;

        $data = [
            'title' => 'Laporan Stok Barang',
            'tanggalMulai' => $tanggalMulai,
            'tanggalSelesai' => $tanggalSelesai,
            'jenis' => $jenis,
            'transaksi' => $transaksi,
            'totalMasuk' => $totalMasuk,
            'totalKeluar' => $totalKeluar,
            'saldo' => $saldo,
            'tanggalCetak' => now()->format('d/m/Y H:i'),
        ];

        $html = view('reports.stock-pdf', $data)->render();

        $options = new Options();
        $options->set('isRemoteEnabled', true);
        $options->set('isHtml5ParserEnabled', true);

        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');

        return $dompdf;
    }

    /**
     * Get transaction data for the report.
     */
    private function getTransaksiData($tanggalMulai, $tanggalSelesai, $jenis, $productId)
    {
        $transaksi = collect();

        if ($jenis === 'semua' || $jenis === 'masuk') {
            $stockIns = StockIn::with('product')
                ->whereBetween('tanggal', [$tanggalMulai, $tanggalSelesai])
                ->when($productId, fn($q) => $q->where('product_id', $productId))
                ->orderBy('tanggal', 'desc')
                ->get();

            foreach ($stockIns as $item) {
                $transaksi->push([
                    'tanggal' => $item->tanggal->format('d/m/Y'),
                    'jenis' => 'masuk',
                    'kode_barang' => $item->product->kode_barang,
                    'nama_barang' => $item->product->nama_barang,
                    'jumlah' => $item->jumlah,
                    'no_referensi' => $item->no_referensi,
                    'keterangan' => $item->keterangan,
                ]);
            }
        }

        if ($jenis === 'semua' || $jenis === 'keluar') {
            $stockOuts = StockOut::with('product')
                ->whereBetween('tanggal', [$tanggalMulai, $tanggalSelesai])
                ->when($productId, fn($q) => $q->where('product_id', $productId))
                ->orderBy('tanggal', 'desc')
                ->get();

            foreach ($stockOuts as $item) {
                $transaksi->push([
                    'tanggal' => $item->tanggal->format('d/m/Y'),
                    'jenis' => 'keluar',
                    'kode_barang' => $item->product->kode_barang,
                    'nama_barang' => $item->product->nama_barang,
                    'jumlah' => $item->jumlah,
                    'no_referensi' => $item->no_referensi,
                    'keterangan' => $item->keterangan,
                ]);
            }
        }

        // Sort by date descending
        return $transaksi->sortByDesc(fn($item) => str_replace('/', '-', $item['tanggal']))->values();
    }
}
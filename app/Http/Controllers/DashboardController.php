<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\StockIn;
use App\Models\StockOut;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $currentMonth = now()->month;
        $currentYear = now()->year;

        // Total produk
        $totalProduk = Product::count();

        // Total kategori
        $totalKategori = Category::count();

        // Total supplier
        $totalSupplier = Supplier::count();

        // Total stok masuk bulan ini
        $totalStokMasuk = StockIn::whereMonth('tanggal', $currentMonth)
            ->whereYear('tanggal', $currentYear)
            ->sum('jumlah');

        // Total stok keluar bulan ini
        $totalStokKeluar = StockOut::whereMonth('tanggal', $currentMonth)
            ->whereYear('tanggal', $currentYear)
            ->sum('jumlah');

        // Produk stok rendah (stok <= stok_minimum)
        $produkStokRendah = Product::whereColumn('stok', '<=', 'stok_minimum')
            ->count();

        // ===== 5 Produk Stok TERTINGGI =====
        // Hanya produk dengan stok LEBIH DARI stok_minimum, urutkan terbesar
        $stokTertinggi = Product::with('category')
            ->whereColumn('stok', '>', 'stok_minimum')
            ->orderBy('stok', 'desc')
            ->take(5)
            ->get(['id', 'kode_barang', 'nama_barang', 'category_id', 'stok', 'stok_minimum']);

        // Fallback: jika tidak ada yang di atas minimum, kosongkan
        if ($stokTertinggi->isEmpty()) {
            $stokTertinggi = collect([]);
        }

        // ===== 5 Produk Stok TERENDAH =====
        // Hanya produk dengan stok KURANG DARI/SAMA DENGAN stok_minimum (perlu restock)
        // Yang TIDAK ada di daftar stok tertinggi
        $highestIds = $stokTertinggi->pluck('id')->toArray();
        $stokTerendah = Product::with('category')
            ->whereColumn('stok', '<=', 'stok_minimum')
            ->whereNotIn('id', $highestIds)
            ->orderBy('stok', 'asc')
            ->take(5)
            ->get(['id', 'kode_barang', 'nama_barang', 'category_id', 'stok', 'stok_minimum']);

        // Grafik 6 bulan terakhir
        $grafikBulanan = $this->getGrafikBulanan();

        // Grafik 30 hari terakhir
        $grafikHarian = $this->getGrafikHarian();

        return inertia('Dashboard', [
            'totalProduk' => $totalProduk,
            'totalKategori' => $totalKategori,
            'totalSupplier' => $totalSupplier,
            'totalStokMasuk' => $totalStokMasuk,
            'totalStokKeluar' => $totalStokKeluar,
            'produkStokRendah' => $produkStokRendah,
            'stokTertinggi' => $stokTertinggi,
            'stokTerendah' => $stokTerendah,
            'grafikBulanan' => $grafikBulanan,
            'grafikHarian' => $grafikHarian,
        ]);
    }

    /**
     * Get monthly stock data for the last 6 months.
     */
    private function getGrafikBulanan()
    {
        $data = [];
        $bulanIndonesia = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

        for ($i = 5; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $month = $date->month;
            $year = $date->year;

            $masuk = StockIn::whereMonth('tanggal', $month)
                ->whereYear('tanggal', $year)
                ->sum('jumlah');

            $keluar = StockOut::whereMonth('tanggal', $month)
                ->whereYear('tanggal', $year)
                ->sum('jumlah');

            $data[] = [
                'bulan' => $bulanIndonesia[$month],
                'masuk' => $masuk,
                'keluar' => $keluar,
            ];
        }

        return $data;
    }

    /**
     * Get daily stock data for the last 30 days.
     */
    private function getGrafikHarian()
    {
        $data = [];

        for ($i = 29; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $dateString = $date->format('Y-m-d');

            $masuk = StockIn::whereDate('tanggal', $dateString)->sum('jumlah');
            $keluar = StockOut::whereDate('tanggal', $dateString)->sum('jumlah');

            $data[] = [
                'tanggal' => $date->format('d/m'),
                'masuk' => $masuk,
                'keluar' => $keluar,
            ];
        }

        return $data;
    }
}
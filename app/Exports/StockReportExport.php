<?php

namespace App\Exports;

use App\Models\StockIn;
use App\Models\StockOut;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class StockReportExport implements FromCollection, WithHeadings, WithStyles
{
    protected $tanggalMulai;
    protected $tanggalSelesai;
    protected $jenis;
    protected $productId;

    public function __construct($tanggalMulai, $tanggalSelesai, $jenis = 'semua', $productId = null)
    {
        $this->tanggalMulai = $tanggalMulai;
        $this->tanggalSelesai = $tanggalSelesai;
        $this->jenis = $jenis;
        $this->productId = $productId;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $transaksi = [];

        // Get stock ins
        if ($this->jenis === 'semua' || $this->jenis === 'masuk') {
            $stockInsQuery = StockIn::with('product')
                ->whereBetween('tanggal', [$this->tanggalMulai, $this->tanggalSelesai]);

            if ($this->productId) {
                $stockInsQuery->where('product_id', $this->productId);
            }

            $stockIns = $stockInsQuery->orderBy('tanggal', 'desc')->get();

            foreach ($stockIns as $item) {
                $transaksi[] = [
                    'tanggal' => $item->tanggal->format('d/m/Y'),
                    'jenis' => 'Masuk',
                    'kode_barang' => $item->product->kode_barang ?? '-',
                    'nama_barang' => $item->product->nama_barang ?? '-',
                    'jumlah' => $item->jumlah,
                    'no_referensi' => $item->no_referensi ?? '-',
                    'keterangan' => $item->keterangan ?? '-',
                ];
            }
        }

        // Get stock outs
        if ($this->jenis === 'semua' || $this->jenis === 'keluar') {
            $stockOutsQuery = StockOut::with('product')
                ->whereBetween('tanggal', [$this->tanggalMulai, $this->tanggalSelesai]);

            if ($this->productId) {
                $stockOutsQuery->where('product_id', $this->productId);
            }

            $stockOuts = $stockOutsQuery->orderBy('tanggal', 'desc')->get();

            foreach ($stockOuts as $item) {
                $transaksi[] = [
                    'tanggal' => $item->tanggal->format('d/m/Y'),
                    'jenis' => 'Keluar',
                    'kode_barang' => $item->product->kode_barang ?? '-',
                    'nama_barang' => $item->product->nama_barang ?? '-',
                    'jumlah' => $item->jumlah,
                    'no_referensi' => $item->no_referensi ?? '-',
                    'keterangan' => $item->keterangan ?? '-',
                ];
            }
        }

        // Sort by tanggal descending
        usort($transaksi, function ($a, $b) {
            return strcmp($b['tanggal'], $a['tanggal']);
        });

        // Add line number
        $result = [];
        foreach ($transaksi as $index => $item) {
            $result[] = [
                'no' => $index + 1,
                ...$item,
            ];
        }

        return collect($result);
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        return [
            'No',
            'Tanggal',
            'Jenis',
            'Kode Barang',
            'Nama Barang',
            'Jumlah',
            'No Referensi',
            'Keterangan',
        ];
    }

    /**
     * @param Worksheet $sheet
     */
    public function styles(Worksheet $sheet)
    {
        return [
            // Style the first row as bold header
            1 => [
                'font' => ['bold' => true],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'startColor' => ['rgb' => 'E0E0E0'],
                ],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                ],
            ],
            // Set column widths
            'A' => ['width' => 6],   // No
            'B' => ['width' => 12],  // Tanggal
            'C' => ['width' => 10],  // Jenis
            'D' => ['width' => 15],  // Kode Barang
            'E' => ['width' => 30],  // Nama Barang
            'F' => ['width' => 10],  // Jumlah
            'G' => ['width' => 20],  // No Referensi
            'H' => ['width' => 30],  // Keterangan
        ];
    }
}
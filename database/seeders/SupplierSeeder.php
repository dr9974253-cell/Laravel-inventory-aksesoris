<?php

namespace Database\Seeders;

use App\Models\Supplier;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $suppliers = [
            [
                'kode_supplier' => 'SUP001',
                'nama_supplier' => 'Toko Emas Indah',
                'telepon' => '02112345678',
                'email' => 'tokoemasindah@example.com',
                'alamat' => 'Jl. Sudirman No. 123, Jakarta Pusat',
                'keterangan' => 'Supplier utama perhiasan emas',
            ],
            [
                'kode_supplier' => 'SUP002',
                'nama_supplier' => 'CV Perhiasan Nusantara',
                'telepon' => '02276543210',
                'email' => 'cvperhiasannusantara@example.com',
                'alamat' => 'Jl. Asia Afrika No. 45, Bandung',
                'keterangan' => 'Supplier perhiasan silver dan alloy',
            ],
            [
                'kode_supplier' => 'SUP003',
                'nama_supplier' => 'UD Berlian Jaya',
                'telepon' => '03187654321',
                'email' => 'udberlianjaya@example.com',
                'alamat' => 'Jl. Pemuda No. 78, Surabaya',
                'keterangan' => 'Supplier batu permata dan berlian',
            ],
        ];

        foreach ($suppliers as $supplier) {
            Supplier::updateOrCreate(
                ['kode_supplier' => $supplier['kode_supplier']],
                $supplier
            );
        }

        $this->command->info('Suppliers seeded: ' . count($suppliers) . ' suppliers');
    }
}
<?php

namespace Database\Seeders;

use App\Models\Unit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UnitSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $units = [
            ['kode_satuan' => 'SAT001', 'nama_satuan' => 'Pcs', 'deskripsi' => 'Satuan pieces/buah'],
            ['kode_satuan' => 'SAT002', 'nama_satuan' => 'Gram', 'deskripsi' => 'Satuan berat gram'],
            ['kode_satuan' => 'SAT003', 'nama_satuan' => 'Karat', 'deskripsi' => 'Satuan berat batu permata'],
            ['kode_satuan' => 'SAT004', 'nama_satuan' => 'Set', 'deskripsi' => 'Satuan套装/perangkat'],
            ['kode_satuan' => 'SAT005', 'nama_satuan' => 'Lusin', 'deskripsi' => 'Satuan 12 pcs'],
        ];

        foreach ($units as $unit) {
            Unit::updateOrCreate(
                ['kode_satuan' => $unit['kode_satuan']],
                $unit
            );
        }

        $this->command->info('Units seeded: ' . count($units) . ' units');
    }
}
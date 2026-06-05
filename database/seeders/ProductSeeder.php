<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     * Data produk dikosongkan agar admin bisa input sendiri
     */
    public function run(): void
    {
        // Data produk dikosongkan - input manual melalui menu Master Produk
        $this->command->info('ProductSeeder: Data produk dikosongkan. Silakan input melalui menu Master Produk.');
    }
}

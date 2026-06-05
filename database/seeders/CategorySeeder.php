<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['kode_kategori' => 'KAT001', 'nama_kategori' => 'Cincin', 'deskripsi' => 'Berbagai jenis cincin perhiasan'],
            ['kode_kategori' => 'KAT002', 'nama_kategori' => 'Kalung', 'deskripsi' => 'Berbagai jenis kalung dan liontin'],
            ['kode_kategori' => 'KAT003', 'nama_kategori' => 'Gelang', 'deskripsi' => 'Berbagai jenis gelang perhiasan'],
            ['kode_kategori' => 'KAT004', 'nama_kategori' => 'Anting', 'deskripsi' => 'Berbagai jenis anting dan giwang'],
            ['kode_kategori' => 'KAT005', 'nama_kategori' => 'Bros', 'deskripsi' => 'Berbagai jenis bros dan jarum'],
            ['kode_kategori' => 'KAT006', 'nama_kategori' => 'Gelang Kaki', 'deskripsi' => 'Gelang kaki dan anklet'],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['kode_kategori' => $category['kode_kategori']],
                $category
            );
        }

        $this->command->info('Categories seeded: ' . count($categories) . ' categories');
    }
}
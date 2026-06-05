<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
            SupplierSeeder::class,
            UnitSeeder::class,
            ProductSeeder::class,
        ]);

        // Create users
        User::updateOrCreate(
            ['email' => 'admin@inventory.com'],
            [
                'name' => 'Admin',
                'email' => 'admin@inventory.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'viewer@inventory.com'],
            [
                'name' => 'Viewer',
                'email' => 'viewer@inventory.com',
                'password' => Hash::make('password'),
                'role' => 'viewer',
                'email_verified_at' => now(),
            ]
        );

        $this->command->info('Users seeded: Admin & Viewer');
    }
}
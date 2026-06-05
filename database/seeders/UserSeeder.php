<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin User
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

        // Create Viewer User
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

        $this->command->info('Users seeded successfully!');
        $this->command->info('Admin: admin@inventory.com / password');
        $this->command->info('Viewer: viewer@inventory.com / password');
    }
}
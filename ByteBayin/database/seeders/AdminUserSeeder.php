<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        // Use updateOrCreate to avoid duplicates
        User::updateOrCreate(
            ['email' => 'admin@bytebayin.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('adminpassword'),
                'role' => 'admin',
            ]
        );

        User::updateOrCreate(
            ['email' => 'user@bytebayin.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('userpassword'),
                'role' => 'user',
            ]
        );
    }
}
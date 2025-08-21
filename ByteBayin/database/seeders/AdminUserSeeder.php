<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@bytebayin.com',
            'password' => Hash::make('adminpassword'), // Change this in production!
            'role' => 'admin',
        ]);
        
        // Optional: Create a regular user for testing
        User::create([
            'name' => 'Test User',
            'email' => 'user@bytebayin.com',
            'password' => Hash::make('userpassword'),
            'role' => 'user',
        ]);
    }
}
<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            [
                'name' => 'Baybayin T-Shirt',
                'price' => 25.99,
                'stock' => 100
            ],
            [
                'name' => 'Baybayin Notebook',
                'price' => 12.50,
                'stock' => 50
            ],
            [
                'name' => 'Baybayin Sticker Pack',
                'price' => 5.99,
                'stock' => 200
            ],
            [
                'name' => 'Baybayin Poster',
                'price' => 15.75,
                'stock' => 30
            ]
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
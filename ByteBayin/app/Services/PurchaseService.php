<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class PurchaseService
{
    public function processOrder($userId, $items)
    {
        return DB::transaction(function () use ($userId, $items) {
            // Create the order
            $order = Order::create([
                'userId' => $userId,
                'totalAmount' => 0, // Will be calculated below
                'status' => 'processing'
            ]);

            \Log::info('Order created with ID: ' . $order->orderId);

            $totalAmount = 0;

            // Process each item in the order
            foreach ($items as $item) {
                $product = Product::findOrFail($item['productId']);

                // Check if there's enough stock
                if ($product->stock < $item['quantity']) {
                    throw new \Exception("Insufficient stock for product: {$product->name}");
                }

                // Create order item
                $orderItem = OrderItem::create([
                    'orderId' => $order->orderId,
                    'productId' => $product->productId,
                    'quantity' => $item['quantity'],
                    'price' => $product->price
                ]);

                // Update product stock
                $product->stock -= $item['quantity'];
                $product->save();

                // Add to total amount
                $totalAmount += $product->price * $item['quantity'];
            }

            // Update order total
            $order->update(['totalAmount' => $totalAmount]);

            return $order;
        });
    }
}
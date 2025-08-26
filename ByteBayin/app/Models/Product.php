<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $primaryKey = 'productId';
    public $incrementing = true;
    
    protected $fillable = [
        'name',
        'price',
        'stock'
    ];

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class, 'product_id', 'productId');
    }

    public function updateStock(int $quantity): void
    {
        if ($this->stock < $quantity) {
            throw new \Exception("Insufficient stock for product: {$this->name}");
        }

        $this->stock -= $quantity;
        $this->save();
    }
}
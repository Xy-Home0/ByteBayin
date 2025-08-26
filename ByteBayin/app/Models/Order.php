<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $primaryKey = 'orderId';
    public $incrementing = true;
    
    protected $fillable = [
        'userId',
        'totalAmount',
        'status'
    ];

    public function getRouteKeyName() {
        return 'orderId';
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class, 'orderId');
    }

    public function calculateTotal(): float
    {
        return $this->items->sum(function ($item) {
            return $item->price * $item->quantity;
        });
    }
}
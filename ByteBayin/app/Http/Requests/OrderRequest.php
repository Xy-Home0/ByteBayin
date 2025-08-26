<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    public function authorize()
    {
        return auth()->check();
    }

    public function rules()
    {
        return [
            'items' => 'required|array',
            'items.*.productId' => 'required|exists:products,productId',
            'items.*.quantity' => 'required|integer|min:1',
        ];
    }
}
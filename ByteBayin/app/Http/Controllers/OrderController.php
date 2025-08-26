<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Services\PurchaseService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    protected $purchaseService;

    public function __construct(PurchaseService $purchaseService)
    {
        $this->purchaseService = $purchaseService;
    }

    /**
     * Display a listing of the user's orders.
     */
    public function index(): Response
    {
        $orders = auth()->user()->orders()->with('items.product')->get();
        
        return Inertia::render('Orders/Index', [
            'orders' => $orders
        ]);
    }

    /**
     * Store a newly created order.
     */
    public function store(OrderRequest $request)
    {
        try {
            $order = $this->purchaseService->processOrder(
                auth()->id(),
                $request->input('items')
            );

            return redirect()->route('orders.show', $order->orderId)
                ->with('success', 'Order placed successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified order.
     */
    public function show($id): Response
    {
        $order = auth()->user()->orders()->with('items.product')->findOrFail($id);

        return Inertia::render('Orders/Show', [
            'order' => $order
        ]);
    }
}
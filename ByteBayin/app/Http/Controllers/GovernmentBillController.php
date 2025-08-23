<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GovernmentBillController extends Controller
{
    public function index(): Response
    {
        // This would typically come from a database
        // For now, we'll use sample data
        $bills = [
            [
                'title' => 'Baybayin as the National Writing System Act',
                'number' => 'House Bill 1022',
                'status' => 'Pending',
                'date' => 'July 1, 2018',
                'summary' => 'An act declaring Baybayin as the national writing system of the Philippines, promoting its use and encouraging its teaching in schools.',
                'link' => 'https://www.congress.gov.ph/legisdocs/basic_18/HB01022.pdf'
            ],
            [
                'title' => 'Baybayin Act of 2018',
                'number' => 'Senate Bill 433',
                'status' => 'Pending',
                'date' => 'July 25, 2018',
                'summary' => 'An act providing for the use of Baybayin as the national writing system, its preservation and promotion.',
                'link' => 'https://www.senate.gov.ph/lis/bill_res.aspx?congress=17&q=SBN-433'
            ]
        ];

        return Inertia::render('GovernmentBills/Index', [
            'bills' => $bills
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        // obtener la emprese del usuario, el usuario tiene un campo company_id
        // la empresa no tiene un campo user_id
        $company = Company::all()->where("user_id", $request->user->id);
    }

    public function show(Request $request): JsonResponse
    {
        $company = Company::where("user_id", $request->user->id)->first();
        return response()->json(compact("company"), 200);
    }

    public function destroy(Request $request): JsonResponse
    {
        $company = Company::where("user_id", $request->user->id)->first();
        $company = Company::where("user_id", $request->user()->id)
            ->Where("id", $request->company_id)
            ->first();
        $company->delete();
        return response()->json(["message" => "Company deleted"], 200);
    }
}

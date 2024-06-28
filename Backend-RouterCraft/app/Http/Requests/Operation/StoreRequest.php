<?php

namespace App\Http\Requests\Operation;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // 'user' => 'required',
            'name' => 'required|string|max:255',
            'storage' => 'required',
            'clients' => 'required',
        ];
    }

    
    public function failedValidation(Validator $validator): array
    {
        throw new HttpResponseException(response()->json([
            'success'=> false,
            'message' => 'Validation error',
            'errors' => $validator->errors()
        ], 422));
    }
}

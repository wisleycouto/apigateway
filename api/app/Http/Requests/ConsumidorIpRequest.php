<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class ConsumidorIpRequest extends FormRequest
{


    public function authorize()
    {
        return true;
    }

    protected function failedValidation(Validator $validator)
    {
        $errors = (new ValidationException($validator))->errors();

        throw new HttpResponseException(
            response()->json(['success' => false, 'errors' => $errors], JsonResponse::HTTP_BAD_REQUEST)
        );
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "ip" => "required|ipv4"
        ];
    }

    public function messages()
    {
        return [
            'required' => ':attribute é obrigatório!',
            'unique' => ':attribute já esta cadastrado',
            'ipv4' => ":attribute e inválido"
        ];
    }


}

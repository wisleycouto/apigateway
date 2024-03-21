<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class ConsumidorCreateRequest extends FormRequest
{

    protected function failedValidation(Validator $validator)
    {

        $errors = (new ValidationException($validator))->errors();


        throw new HttpResponseException(
            response()->json(['success' => false, 'errors' => $errors], JsonResponse::HTTP_BAD_REQUEST)
        );

    }

    public function authorize()
    {
        return true;
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "data_inicio" => "bail| required",
            "data_fim" => "bail | required",
            "num_sei" => "bail | nullable",
            "email_responsavel" => " bail| required| email:rfc,dns|unique:App\Models\Consumidor,email_responsavel",
            "nome_responsavel" => "bail| required",
            "telefone_responsavel" => "bail | required",
        ];
    }

    public function messages()
    {
        return [
            'required' => ':attribute é obrigatório!',
            'email_responsavel.email' => 'Digite um email válido',
            'unique' => ':attribute já esta cadastrado',
            'ipv4' => ":attribute e inválido"
        ];
    }

}

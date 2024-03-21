<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class ConsumidorDeleteRequest extends FormRequest
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
            "client_id" => " bail|required | unique:App\Models\Consumidor,client_id",
            "client_user" => "bail|required | unique:App\Models\Consumidor,client_user",
            "client_password" => "bail | required",
            "num_sei" => "bail| required",
            "email_responsavel" => " bail| required|email",
            "nome_responsavel" => "bail| required",
            "telefone_responsavel" => "bail | required"
        ];
    }

    public function messages()
    {
        return [
            'required' => ':attribute é obrigatório!',
            'email_responsavel.email' => 'Digite um email válido',
            'unique' => ':attribute já esta cadastrado'
        ];
    }

}

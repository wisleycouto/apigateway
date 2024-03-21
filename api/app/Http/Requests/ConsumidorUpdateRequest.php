<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class ConsumidorUpdateRequest extends FormRequest
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
            'data_inicio' => 'bail|date',
            'data_fim' => 'bail|date',
            'client_id' => 'bail|string',
            'client_user' => 'bail|string',
            'client_password' => 'bail|string',
            'num_sei' => 'bail',
            'email_responsavel' => 'bail|email:rfc,dns',
            'nome_responsavel' => 'bail|string',
            'telefone_responsavel' => 'bail|string',

        ];
    }

    public function messages()
    {
        return [
            'required' => 'É necessário informar o  ":attribute" ',
            'email' => 'Campo ":attribute" com formato inválido ',
            'string' => ':attribute, Não aceita valor numérico ',
            'numeric' => ':attribute, Não aceita texto',
            'date' => ':attribute, formato invalido',
            'exists' => ':attribute não encontrado'
        ];
    }


}

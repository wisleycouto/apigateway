<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class ServicoOlindaRequest extends FormRequest
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
            "nome_servico" => "bail|unique:App\Models\ServicoOlinda,nome_servico",
            "url_servico" => "bail|url",
            "servico_publico" => "bail|boolean"
        ];
    }

    public function messages()
    {
        return [
            'required' => ':attribute é obrigatório!',
            'url' => ':attribute inválido',
            'servico_publico.boolean' => ':attribute inválido',
            'unique' => ':attribute já esta cadastrado'
        ];
    }

}

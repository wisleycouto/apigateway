<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class ConsumidorServicosRequest extends FormRequest
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
            "id_servicos_olinda" =>"bail|required|exists:App\Models\ServicoOlinda,id_servicos_olinda"
        ];
    }

    public function messages()
    {
        return [
            'required' => ':attribute é obrigatório!',
            'id_servicos_olinda.exists' => ':attribute não existe'
        ];
    }

}

<?php

namespace App\Http\Requests;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class LdapRequest extends FormRequest
{
    public function __construct(Request $request)
    {
        $this->validate($request->all(), $this->rules(), $this->messages());

    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
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
            'username' => 'required|max:250',
            'password' => 'required|min:3',
        ];
    }

    public function messages()
    {
        return [
            'username.required' => 'Campo obrigatório',
            'username.max' => 'Quantidade de caracteres excede o valor máximo de :max caracteres',

            'password.required' => 'Campo obrigatório',
            'password.min' => 'Quantidade de caracteres mínimo de :min caracteres',

        ];
    }

    public function validate($params, $rules, $messages)
    {
        $validator = \validator($params, $rules, $messages);

        if ($validator->fails()) {
            $errors = (new ValidationException($validator))->errors();

            throw new HttpResponseException(
                response()->json(['erro' => true, 'msg' => $errors], JsonResponse::HTTP_BAD_REQUEST)
            );
        }
    }
}

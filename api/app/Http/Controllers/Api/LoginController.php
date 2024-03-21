<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LdapRequest;
use App\Services\Ldap\LdapServiceInterface;

class LoginController extends Controller
{
    protected $redirectTo = '/';

    private $ldapService;


    public function __construct(LdapServiceInterface $ldapService)
    {
        $this->ldapService = $ldapService;
    }

    public function login (LdapRequest $request)
    {
        $credentials = $request->all(['username', 'password']);

        try {
            return response()->json([
                'result' => $this->ldapService->login($credentials['username'], $credentials['password']),
                'erro'   => false,
                'msg'    => 'Usuário logado com sucesso!'
            ]);
        } catch (\Exception $e) {
            return \response()->json([
                'erro' => true,
                'msg'  => $e->getMessage()
            ], $e->getCode());
        }
    }
}

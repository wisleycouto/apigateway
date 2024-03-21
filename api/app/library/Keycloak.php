<?php
namespace App\library;
use Illuminate\Http\Request;


class Keycloak
{



    public $autenticou;
    public $permissao;
    public $erros;
    public $accessToken;
    public $refreshToken;
    public $papeis;
    public $nomeUsuario;
    public $code;


    /**
     * Method Pegar Access Token
     * @return type
     */
    public function getAccessToken()
    {
        return $this->accessToken;
    }

    /**
     * Method Pegar Refresh Token
     * @return type
     */
    public function getRefreshToken()
    {
        return $this->refreshToken;
    }

    /**
     * Method Pegar Perfis
     * @return mixed
     */
    public function getPerfis()
    {
        return $this->papeis;
    }

    /**
     * Method Login
     * @param type $wsURL
     * @param type $realName
     * @param type $login
     * @param type $senha
     */
    public function verificaPermissao(Request $request)
    {

        try{

            $uriLogin = 'http://hmg-keycloak.container.mec.gov.br/auth/realms/Olinda/protocol/openid-connect/token';
            $this->erros = array();
            $this->autenticou = false;
            $this->permissao = false;

            $data = array(
                'grant_type' => 'password',
                'username' => $request->get('username'),
                'password' => $request->get('password'),
                'scope' => 'openid',
                'client_id' => $request->get('client_id')
            );

            $data_string = http_build_query($data);
            $ch = curl_init($uriLogin);

            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                    'Content-Type: application/x-www-form-urlencoded'
                )
            );

            $resultIdentities = json_decode(curl_exec($ch));


            if(isset($resultIdentities->access_token)){
                return true;
            }

            return false;

        }catch (\Exception $exception){

            $this->addErro(utf8_encode($exception->getMessage()));
            $this->setCode($exception->getCode());

            return false;

        }

    }



    /**
     * Method Autenticou
     * @return type
     */
    public function autenticou()
    {
        return $this->autenticou;
    }

    /**
     * Method Add Erro (Adicionar Erro)
     * @param type $erro
     */
    private function addErro($erro)
    {
        $this->erros[] = $erro;
    }

    /**
     * Method Get Erro (Pegar o Erro)
     * @return type
     */
    public function getErro()
    {
        return implode(';', $this->erros);
    }

    public function getNomeUsuario(){
        return $this->nomeUsuario;
    }

    /**
     * @return mixed
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * @param mixed $code
     * @return AutenticacaoBasica
     */
    public function setCode($code)
    {
        $this->code = $code;
        return $this;
    }



}

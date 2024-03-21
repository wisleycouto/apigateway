<?php

namespace App\Services\Ldap;

use App\Services\Ldap\LdapServiceInterface;
use Illuminate\Support\Facades\Log;
use function env;


class LdapService implements LdapServiceInterface
{
    private $ldapHost;
    private $ldapPort;
    private $ldapBaseDn;

    public function __construct()
    {
        $this->ldapHost = env('LDAP_HOST', 'mec.gov.br');
        $this->ldapPort = env('LDAP_PORT', 389);
        $this->ldapBaseDn = env('LDAP_BASE_DN',"OU=MEC,DC=mec,DC=gov,DC=br");
    }

    public function connect()
    {
        try{
            $connect = ldap_connect($this->ldapHost, $this->ldapPort);
            return $connect;
        } catch (\Exception $e) {
            Log::error($e->getMessage(),[$e->getTrace()]);
            throw new \Exception("Erro ao conectar no LDAP!",503);
        }
    }

    public function authenticate($ldapConnection, string $user, string $pass)
    {
        try{
            $bind = ldap_bind($ldapConnection, $user, $pass);
            return $bind;
        } catch (\Exception $e) {
            Log::error($e->getMessage(),[$e->getTrace()]);
            throw new \Exception("Usuário e/ou senha inválidos",401);
        }
    }

    public function findUser($ldapConnection, string $user)
    {
        try{
            $filter = 'userprincipalname='.$user;
            $search = ldap_search($ldapConnection, $this->ldapBaseDn, $filter);
            return $search;
        } catch (\Exception $e) {
            throw new \Exception("Usuário não encontrado na base do LDAP",404);
        }
    }

    public function checkUserIsAuthorizedInGroup(array $memberOf)
    {
        $group = env('LDAP_GROUP', null);

        if(empty($group)) {
            return true;
        }

        foreach($memberOf as $groupList) {
           if(strpos(strtolower($groupList), strtolower($group))) {
               return true;
           }
        }

        return false;
    }

    public function createUserObject($ldapConnection, $ldapSearch)
    {
        try {
            $entries = ldap_get_entries($ldapConnection, $ldapSearch);

            // Create user Object
            $ldapUserArray = $entries[0];
            $userObj = new \stdClass();
            $userObj->nome =  utf8_encode($ldapUserArray['cn'][0]);
            $userObj->titulo = utf8_encode($ldapUserArray['description'][0]);
            $userObj->telefone = utf8_encode($ldapUserArray['telephonenumber'][0]);
            $userObj->departamento = utf8_encode($ldapUserArray['department'][0]);
            $userObj->usuario = utf8_encode($ldapUserArray['mailnickname'][0]);
            $userObj->email = utf8_encode($ldapUserArray['mail'][0]);
            $userObj->cpf = utf8_encode($ldapUserArray['cpf'][0]);

            // Verifica se o usuário está ativo
            $ldapDate = empty($ldapUserArray['accountexpires'][0]) ? date('Ymd') : date('Ymd', ($ldapUserArray['accountexpires'][0]/10000000) - 11644473600);
            $active = (date('Ymd') <= $ldapDate);

            if(!$active) {
                throw new \Exception("Usuário não está ativo",401);
            }

            // Verifica se um usuário pertence a um gruppo específico do LDAP
            $groupAuthorized = $this->checkUserIsAuthorizedInGroup($ldapUserArray['memberof']);
            if(!$groupAuthorized) {
                 throw new \Exception("Usuário não possui autorização para acesso ao recurso",401);
            }

            return $userObj;
        } catch (\Exception $e) {
            $msg = $e->getCode() == 401 ? $e->getMessage() : "Dados do usuário LDAP não retornados";
            $code = $e->getCode() == 401 ? $e->getCode() : 422;

            throw new \Exception($msg,$code);
        }
    }

    public function login(string $email, string $password)
    {
        $conection = $this->connect();
        $this->authenticate($conection, $email, $password);
        $userLdap = $this->findUser($conection, $email);
        $userObject = $this->createUserObject($conection, $userLdap);
        ldap_close($conection);
        return $userObject;
    }



}


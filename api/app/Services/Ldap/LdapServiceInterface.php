<?php

namespace App\Services\Ldap;

use http\Exception;

interface LdapServiceInterface
{
    /**
     *  Login - LDAP Auth
     *
     * @param string $email
     * @param string $password
     *
     * @return object $ldapUserObject | null | Exception
    */
    public function login(string $email, string $password);

    /**
     * Check Ldap Connection
     *
     * @return Resource | Exception
     */
    public function connect();

    /**
     *  Check user and password comparing
     *  with LDAP
     *
     * @param $ldapConnection
     * @param string $user
     * @param string $pass
     *
     * @return true | Exception
     */
    public function authenticate($ldapConnection, string $user, string $pass);

    /**
     *  Find user in LDAP
     *
     * @param $ldapConnection
     * @param string $user
     *
     * @return array | Exception
     */
    public function findUser($ldapConnection, string $user);

    /**
     *  Check if user is authorized in LDAP Group
     *
     * @param array $memberOf
     *
     * @return bool | Exception
     */
    public function checkUserIsAuthorizedInGroup(array $memberOf);

    /**
     *  Create a user object
     *
     * @param $ldapConnection
     * @param $ldapSearch
     *
     * @return object | Exception
     */
    public function createUserObject($ldapConnection, $ldapSearch);
}

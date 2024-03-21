<?php

namespace App\Providers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;


/**
 * Controllers
 */


use App\Services\Classes\Olinda;
use App\Services\OlindaInterface;
use App\Services\Ldap\LdapServiceInterface;
use App\Services\Ldap\LdapService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        /**
         * Controllers
         */

        /**
         * Services
         */

        $this->app->bind(OlindaInterface::class, Olinda::class);
        $this->app->bind(LdapServiceInterface::class, LdapService::class);

    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Validator::extend('cpf', '\App\Utils\CpfValidation@validate');

    }
}

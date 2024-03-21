<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

/** Rota Usada para helmcheck do cluster Kubernet no MEC. */
class HelmCheckController extends Controller
{
    public function helmcheck()
    {
        try {
            DB::connection()->getPdo();
            if (DB::connection()->getDatabaseName()) {
                echo "Conectado com sucesso à base de dados: " . DB::connection()->getDatabaseName();
            } else {
                die("Não foi possível encontrar o banco de dados. Por favor, verifique sua configuração.");
            }
        } catch (\Exception $e) {
            die("Não foi possível abrir a conexão com o servidor de banco de dados. Por favor, verifique sua configuração.");
        }
    }
}


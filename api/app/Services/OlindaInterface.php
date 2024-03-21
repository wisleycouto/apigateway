<?php

namespace App\Services;


use Illuminate\Http\Request;

interface OlindaInterface
{
    /**
     *
     */
    public function __construct();

    public function consultarOlinda(Request $request);
    public function consultarFiltrosServico(Request $request);
    public function consultarDocumentacaoFiltro(Request $request);
    public function consultarPortal(Request $request);
    public function consultarOlindapowerbi(Request $request);
    public function consultarOlindacsv(Request $request);


}

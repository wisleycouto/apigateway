<?php

namespace App\Http\Controllers\Api;

use App\Services\OlindaInterface;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class OlindaController extends Controller
{

    private $olindaService;

    public function __construct(
        OlindaInterface $olindaService
    )
    {
        $this->olindaService = $olindaService;
    }

    public function consultarOlinda(Request $request)
    {
        return $this->olindaService->consultarOlinda($request);
    }
        //routa criada para atender necessidade de integração PDA-exportação em CVS

    public function consultarOlindacsv(Request $request)
    {
        return $this->olindaService->consultarOlindacsv($request);
    }
    
    //routa criada para atender necessidade de integração via BI
    public function consultarOlindapowerbi(Request $request)
    {
        return $this->olindaService->consultarOlindapowerbi($request);
    }

    public function consultarFiltrosServico(Request $request)
    {
        return $this->olindaService->consultarFiltrosServico($request);
    }

    public function consultarDocumentacaoFiltro(Request $request){

        return $this->olindaService->consultarDocumentacaoFiltro($request);

    }
     //routa criada para atender necessidade de integração com portal do MEC
    public function consultarPortal(Request $request){

        return $this->olindaService->consultarPortal($request);

    }

}

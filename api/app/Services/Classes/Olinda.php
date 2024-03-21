<?php

namespace App\Services\Classes;

use App\Helpers\CpfHelper;
use App\library\WsOlinda;
use App\Models\ServicoOlinda;
use App\Services\OlindaInterface;
use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\URL;


class Olinda implements OlindaInterface
{

    protected $apiWsOlinda;
    protected $urlDocumentacao = 'https://olinda.mec.gov.br/olinda-ide/servico/@servico@/versao/v1/swagger';
    protected $urlPortal = 'https://www.gov.br/mec/pt-br/assuntos/noticias';
    public function __construct()
    {
        $this->apiWsOlinda = new WsOlinda();
    }

    public function consultarOlinda(Request $request)
    {

        try {

            $urlService = $this->getUrlServiceOlinda($request);
            
            $result = $this->apiWsOlinda->getServicoOlinda($urlService);

            return response()->json($result, 200);

        } catch (\Exception $exception) {

            return response()->json(['success' => false, 'error' => $exception->getMessage()], $exception->getCode());

        }

    }
    public function consultarOlindacsv(Request $request)
    {
        try {

            $urlService = $this->getUrlServiceOlindaCsv($request);
            $result = $this->apiWsOlinda->getServicoOlinda($urlService);
            
            return Redirect::to($urlService);
 

        } catch (\Exception $exception) {

            return response()->json(['success' => false, 'error' => $exception->getMessage()], $exception->getCode());

        }
 
    }
    public function consultarOlindapowerbi(Request $request)
    {

        try {

            $urlService = $this->getUrlServiceOlinda($request);
          
            $result = $this->apiWsOlinda->getServicoOlinda($urlService);

            return response()->json($result, 200);

        } catch (\Exception $exception) {

            return response()->json(['success' => false, 'error' => $exception->getMessage()], $exception->getCode());

        }

    }

    public function consultarFiltrosServico(Request $request)
    {

        try {

            $servico = $request->get('servico');
            $servicoOlinda = ServicoOlinda::where('nome_servico', $servico)->first();

            $urlService = $this->getUrlFiltrosServico($request, $servicoOlinda);

            $result = $this->apiWsOlinda->getFiltrosServicoOlinda($urlService, $servicoOlinda);
            $result['manual_apoio'] = URL::to('/api/olinda/consultar-documentacao-filtro');


            return response()->json($result, 200);

        } catch (\Exception $exception) {

            return response()->json(['success' => false, 'error' => $exception->getMessage()], 500);

        }

    }
    public function getUrlServiceOlindaCsv(Request $request)
        {
            $servico = $request->get('servico');
            $servicoOlinda = ServicoOlinda::where('nome_servico', $servico)->first();
    
            $url = $servicoOlinda->url_servico;
            $url .= '?$format=text/csv';
            
            $filtro = $request->get('filtro');
            if($filtro){
                foreach ($filtro as $key => $value){
    
                    if(strpos($key, '@') !== false &&
                        (
                            CpfHelper::validaCpf($value) ||
                            CpfHelper::validaCNPJ($value) ||
                            strpos(strtolower($key), 'inep') !== false ||
                            strpos(strtolower($key), 'uf') !== false ||
                            strpos(strtolower($key), 'nome') !== false
                        )
                    )
                    {
                        $url .= "&{$key}=%27{$value}%27";
                    }else{
                        $url .= "&{$key}={$value}";
                    }
                }
            }
    
            if(!isset($filtro['$top']) || empty($filtro['$top'])){
                $url .= '&$top=100000';
            }
    
            return $url;


        }
    public function getUrlServiceOlinda(Request $request){

        $servico = $request->get('servico');
        $servicoOlinda = ServicoOlinda::where('nome_servico', $servico)->first();

        $url = $servicoOlinda->url_servico;
        $url .= '?$format=json';

        $filtro = $request->get('filtro');
        if($filtro){
            foreach ($filtro as $key => $value){

                if(strpos($key, '@') !== false &&
                    (
                        CpfHelper::validaCpf($value) ||
                        CpfHelper::validaCNPJ($value) ||
                        strpos(strtolower($key), 'inep') !== false ||
                        strpos(strtolower($key), 'uf') !== false ||
                        strpos(strtolower($key), 'nome') !== false
                    )
                )
                {
                    $url .= "&{$key}=%27{$value}%27";
                }else{
                    $url .= "&{$key}={$value}";
                }
            }
        }

        if(!isset($filtro['$top']) || empty($filtro['$top'])){
            $url .= '&$top=100000';
        }

        return $url;

    }

    public function getUrlFiltrosServico(Request $request, $servicoOlinda){

        $url = str_replace('@servico@',$servicoOlinda->servico, $this->urlDocumentacao);

        return $url;

    }

    public function consultarDocumentacaoFiltro(Request $request)
    {
        try {

            $result = $this->apiWsOlinda->getDocFiltro();
            $pdf = PDF::loadHtml($result['html']);
            return $pdf->download('manual_de_apoio.pdf');

        } catch (\Exception $exception) {
            return response()->json(['success' => false, 'error' => $exception->getMessage()], 500);
        }

    }
    public function consultarPortal(Request $request)
    {
            /*$linha = '';
            $x = 'xis';
            $result = $servico = $request->get('servico');

            $urlPortal = $this->urlPortal.'/';
            
            $ch = curl_init();
            $timeout = 5; // set to zero for no timeout
            curl_setopt ($ch, CURLOPT_URL, $urlPortal);
            curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
            $file_contents = curl_exec($ch);
            curl_close($ch);
            $lines = array();
            $lines = explode("\n", $file_contents);

            // display file line by line
            foreach($lines as $line_num => $line) {
                //$x = 'XIS';
                if ($line_num == 3604 ){
                    $x = 'CHIS';
                    echo $linha = htmlspecialchars($line);exit;
                }
                
                if ($linha == '&lt;ul class=&quot;noticias listagem-noticias-com-foto&quot;&gt;'){
                    $x = "um";
                }
            }
            return $x;*/



        try {
            $content = file_get_contents($this->urlPortal);
            $lines = explode("\n", $content);
            $x = 0;
            $y = 0;
            $reg = 0;
            $flag = 'N'; 
            $pulaUmaLinha = "N";
            $arrPublicacoes = array();
            foreach ($lines as $line) {
                $x++;
                if ($flag == 'S'){
                    if (trim(htmlspecialchars($line)) == "&lt;li&gt;"){
                        $reg++;
                    }
                    if (trim(htmlspecialchars($line)) == "&lt;/li&gt;"){
                        $registro = [
                            "href" => $href,
                            "titulo" => $titulo,
                            "urlImagem" => $urlImagem,
                            "data" => $data,
                            "descricao" => $descricao 
                        ];
                        $arrPublicacoes[$reg] = $registro;
                    }
                    //echo "<hr>";
                    //echo "<b>LINHA</b> $x:" . htmlspecialchars($line) . "<br>";
                    $str = trim(htmlspecialchars($line));

                    $str1 = substr(trim($str), 0, 17);
                    if ( htmlspecialchars($str1) == htmlspecialchars('&lt;a href=&quot;')){
                        $strExplode = explode(htmlspecialchars('<a href="'), trim(htmlspecialchars($line)) );
                        $temporario = explode(htmlspecialchars('&quot;&gt;'), htmlspecialchars($strExplode[1]));
                        $href = $temporario[0];
                        $temporario = explode(htmlspecialchars('&amp;lt;/a&amp;gt;'), htmlspecialchars($temporario[1]));
                        $titulo = "$temporario[0]";
                        //echo "<br><hr>Linha $x:" .htmlspecialchars($line);
                    }

                    $str2 = substr(trim($str), 0, 46);
                    if ( htmlspecialchars($str2) == htmlspecialchars('&lt;img class=&quot;newsImage&quot; src=&quot;')){
                        $strExplode = explode(htmlspecialchars('<img class="newsImage" src="'), trim(htmlspecialchars($line)) );
                        $temporario = explode(htmlspecialchars('&quot; alt='), htmlspecialchars($strExplode[1]));
                        $urlImagem = $temporario[0];            
                    }

                    if ($y == $x){
                        $descricao = $str;
                    }

                    if (strlen($str) == 12 and substr($str, -1) == "-"){
                        $data = substr(trim($str), 0, 10);
                        $y = $x + 2;
                    }


                    //echo "Linha $x:" .htmlspecialchars($str) . "#".htmlspecialchars($line);
                    //echo "<br>";
                    
                }

                if ( trim(htmlspecialchars($line)) == htmlspecialchars('<ul class="noticias listagem-noticias-com-foto">')){
                    $flag = 'S';
                }
                if ( trim(htmlspecialchars($line)) == htmlspecialchars('</ul>')){
                    $flag = 'N';
                }
            }

            $json = json_encode($arrPublicacoes, JSON_PRETTY_PRINT);



            return $json;
            
            //var_dump($urlPortal);
          
        } catch (\Exception $exception) {
            return response()->json(['success' => false, 'error' => $exception->getMessage()], 500);
        }

    }


}


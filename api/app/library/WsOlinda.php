<?php

namespace App\library;

use GuzzleHttp\Client;

class WsOlinda
{

    private $client;
    private $endpointdDocFiltro = 'https://olinda.mec.gov.br/olinda-ide/servico/ajuda';

    public function __construct(){

        $this->client = new Client();
    }

    public function getServicoOlinda($servico){

        try {

            $response = $this->client->request('GET', $servico);

            $success = false;
            $result = [];

            if($response->getStatusCode() == 200){

                $body = json_decode($response->getBody());
                if(isset($body->value)){
                    $success = true;
                    $result = $body->value;
                }
            }

            return [
                'success' => $success,
                'body' => $result
            ];
        }catch (\Exception $exception){

            if($exception->getCode() == 400){
                throw new \Exception('Erro na comunicação com Olinda ou parâmetro inválido', 400);
            }

            throw new \Exception('Erro na comunicação com Olinda, Olinda não esta disponivel nesse momento.', 500);
        }
    }

    public function getFiltrosServicoOlinda($urlServico, $servicoOlinda){

        try {

            list($nomeServico, $funcao) = explode('#',$servicoOlinda->nome_servico);

            $response = $this->client->request('GET', $urlServico);

            $success = false;
            $result = [];

            if($response->getStatusCode() == 200){

                $body = json_decode($response->getBody());
                $result = json_decode(json_encode($body->paths), true);
                $result = $result["/{$funcao}"]['get']['parameters'];

                if(!$result){
                    throw new \Exception('Filtros não encontrados', 500);
                }

                foreach ($result as $key =>$row){
                    if($row['name'] == '$format'){
                        unset($result[$key]);
                    }
                }

                $result = array_values($result);
                $success = true;

            }
            return [
                'success' => $success,
                'body' => $result
            ];
        }catch (\Exception $exception){

            throw new \Exception('Erro na comunicação com Olinda, Olinda não esta disponivel nesse momento', 500);
        }
    }

    public function getDocFiltro(){

        try {

            $html = file_get_contents($this->endpointdDocFiltro);

            return [
                'success' => true,
                'html' => $html
            ];
        }catch (\Exception $exception){

            throw new \Exception('Erro na comunicação com Olinda', 500);
        }
    }

}

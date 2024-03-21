<?php

namespace App\Http\Middleware;

use App\Models\Consumidor;
use App\Models\ServicoOlinda;
use Closure;

class CheckUser
{

    protected $messageError;

    public function handle($request, Closure $next, $guard = null)
    {

        $checkedPermissao = $this->checkConsumidorIp($request);

        if(!$checkedPermissao){
            return response()->json([
                'success' => false, 'error' => $this->messageError
            ], 403);

        }

        return $next($request);
    }


    public function checkConsumidorIp($request){


        $token = $request->get('token_acesso');
        $servico = $request->get('servico');

        $servicoOlinda = ServicoOlinda::where('nome_servico', $servico)->first();

        if(!$servicoOlinda){
            $this->messageError = 'O serviço informado não foi encontrado no olinda ou não esta cadastrado no Apigatewayolinda.';
            return false;
        }

        if($servicoOlinda->servico_publico){
            return true;
        }

        /** @var Consumidor $consumidorModel */
        $consumidorModel = new Consumidor();
        $consumidor = $consumidorModel->where('token_acesso', $token)->where('data_inicio','<=', new \DateTime())->where('data_fim','>=', new \DateTime())->first();


        if(!$consumidor){
            $this->messageError = ' Este Token de acesso não foi encontrando no Apigatewayolinda.';
            return false;
        }


        if(!in_array($servicoOlinda->id_servicos_olinda, $consumidor->consumidorServices->pluck('id_servicos_olinda')->toArray())){
            $this->messageError = 'Este token de acesso não tem permissão para acessar o serviço no Olinda.';
            return false;
        }

        $ipRequest = $this->getIp();

        if(!in_array($ipRequest, $consumidor->consumidorIp->pluck('ip')->toArray())){
            $this->messageError = 'IP não autorizado acessar apigatewayolinda, favor entrar em contato com STIC do MEC. IP da requisição não autorizado -> '.$ipRequest;
            return false;
        }

        return true;

    }

    public function getIp(){

        return request()->ip();

        foreach (array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR') as $key){
            if (array_key_exists($key, $_SERVER) === true){
                foreach (explode(',', $_SERVER[$key]) as $ip){
                    $ip = trim($ip);
                    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false){
                        return $ip;
                    }
                }
            }
        }
        return request()->ip();
    }
}

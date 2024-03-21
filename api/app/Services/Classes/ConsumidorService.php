<?php

namespace App\Services\Classes;

use App\Models\Consumidor;
use App\Models\ConsumidorServico;
use App\Models\ServicoOlinda;
use Dirape\Token\Token;
use Illuminate\Http\Request;

use App\Services\Classes\ConsumidorIpsService;


class ConsumidorService
{
    protected $model;
    protected $consumidorServicosService;


    public function __construct(ConsumidorServicosService $consumidorServicosService)
    {
        $this->model = new Consumidor();
        $this->servico = new ConsumidorServico();
        $this->consumidorServicosService = $consumidorServicosService;
    }

    public function createConsumidores($data)
    {
        $data['token_acesso'] = (new Token())->Unique('tb_consumidor', 'token_acesso', 100);

        $consumidores = $this->model->fill($data);
        $consumidores->saveOrFail();
        return $consumidores;
    }

    public function updateConsumidores($data)
    {
        /** @var Consumidor $consumidores */
        $consumidores = $this->model->where("id_consumidor", $data ["id_consumidor"])->first();
        foreach ($data as $field => $value) {
            $consumidores->$field = $value;
        }

        $consumidores->saveOrFail();
        $consumidores->refresh();
        return $consumidores;
    }

    public function deleteConsumidores($id)
    {
        $consumidores = $this->model->find($id);
        $consumidores->delete();
        return $consumidores;
    }

    public function restoreConsumidores($id)
    {
        $consumidores = $this->model->withTrashed()->find($id);
        $consumidores->restore();
        return $consumidores;
    }

    public function get($id)
    {
        return $this->model->where("id_consumidor",$id)->withTrashed()->get()->first();
    }

    public function listConsumidores($status=null)
    {
        return $this->model->withTrashed()->get();
    }

    public function listServicosConsumidor($id)
    {
        $dadosConsumidorServico = $this->servico->where("id_consumidor",$id)->withTrashed()->get();
        $array = [];
        foreach ($dadosConsumidorServico->toArray() as $row){
            $service = ServicoOlinda::where('id_servicos_olinda',$row['id_servicos_olinda'])->withTrashed()->first();
            $service->id_consumidor_servicos = $row['id_consumidor_servicos'];
            $service->deleted_at = $row['deleted_at'];
            $array[] = $service;
        }

        return $array;
    }

    public function deleteConsumidorServico($idConsumidorServico)
    {
        $consumidorServico =  $this->servico->where('id_consumidor_servicos', $idConsumidorServico)->firstOrFail();
        $consumidorServico->delete();
        return $consumidorServico;
    }

    public function restoreConsumidorServico($idConsumidorServico)
    {
        $consumidorServico =  $this->servico->withTrashed()->find($idConsumidorServico)->restore();
        return $consumidorServico;
    }

}

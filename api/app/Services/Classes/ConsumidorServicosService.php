<?php

namespace App\Services\Classes;

use App\Models\ConsumidorServico;

class ConsumidorServicosService
{
    protected $model;

    public function __construct()
    {
        $this->model = new ConsumidorServico();
    }

    public function createConsumidorServicos($data)
    {
       $exists = $this->model->where(['id_consumidor' => $data['id_consumidor'], 'id_servicos_olinda' => $data['id_servicos_olinda']])->first();

       if(!empty($exists)) {
           Throw new \Exception('Serviço já vinculado', 400);
       }

        $consumidoresServicos = $this->model->fill($data);
        $consumidoresServicos->saveOrFail();
        return $consumidoresServicos;
    }

    public function deleteConsumidores($data)
    {
        $consumidoresServicos = $this->model->find($data);
        $consumidoresServicos->delete();
        return $consumidoresServicos;
    }
}

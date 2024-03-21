<?php

namespace App\Services\Classes;

use App\Models\ServicoOlinda;

class ServicosOlindaService
{
    protected $model;

    public function __construct()
    {
        $this->model = new ServicoOlinda();
    }

    public function createServicosOlinda($data)
    {
            $servicosOlinda = $this->model->fill($data);
            $servicosOlinda->saveOrFail();
            return $servicosOlinda;
    }

    public function updateServicosOlinda($id, $data)
    {

        $servicoOlinda = $this->model->where('id_servicos_olinda', $id)->first();
        
        $servicoOlinda->nome_servico= $data['nome_servico'];
        $servicoOlinda->url_servico= $data['url_servico'];
        $servicoOlinda->servico_publico= $data['servico_publico'];
        $servicoOlinda->servico = $data['servico'];

        $servicoOlinda->saveOrFail();
        $servicoOlinda->refresh();

        return $servicoOlinda;        
    }

    public function deleteServicosOlinda($date)
    {
            $servicosOlinda = $this->model->find($id);
            $servicosOlinda->delete();
            return $servicosOlinda;
    }

    public function listServicosOlinda($status=null)
    {
        return $this->model->withTrashed()->get();
    }

    public function listServicosOlindaPrivados()
    {
        return $this->model->withTrashed()->where('servico_publico', false)->get();
    }

    public function listId($id_consumidor)
    {dd($this->model->where("id_consumidor",$id_consumidor)->servicosOlinda()->get());
        return $this->model->where("id_consumidor",$id_consumidor)->get()->consumidorServicoOlinda();
    }

    public function listIdServico($id_servico)
    {   
        return $this->model->where('id_servicos_olinda', $id_servico)->withTrashed()->get()->first();
    }

}


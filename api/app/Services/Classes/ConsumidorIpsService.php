<?php

namespace App\Services\Classes;

use App\Models\ConsumidorIp;

class ConsumidorIpsService
{
    protected $model;

    public function __construct()
    {
        $this->model = new ConsumidorIp();
    }

    public function createConsumidoresIps($data)
    {
        $consumidoresIps = $this->model->fill($data);
        $consumidoresIps->saveOrFail();

        return $consumidoresIps;
    }

    public function updateConsumidoresIps($id, $data)
    {
         $consumidoresIps = $this->model->find($id);
         $consumidoresIps->ip = $data["ip"];
         $consumidoresIps->save();

         return $consumidoresIps;
    }

    public function deleteConsumidoresIps($id)
    {
            $consumidoresIps = ConsumidorIp::where('id_consumidor_ip', $id)->firstOrFail();
            $consumidoresIps->delete();
            return $consumidoresIps;
    }

    public function restoreConsumidoresIps($id)
    {
        $consumidoresIps = ConsumidorIp::withTrashed()->find($id)->restore();
        return $consumidoresIps;
    }

    public function listId($id)
    {
        return $this->model->find($id);
    }

    public function listIpsByConsumidorId($id_consumidor)
    {
        return $this->model->withTrashed()->where("id_consumidor", $id_consumidor)->get();
    }

    public function listIps()
    {
        return $this->model->withTrashed()->get();
    }

    public function listConsumidoresIp($status=null)
    {
        return $this->model->withTrashed()->get();
    }
}

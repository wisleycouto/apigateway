<?php

namespace App\Services\Classes;

class LogService
{
    protected $model;

    public function __construct()
    {
        $this->model = new LogService();
    }

    public function createLog($data)
    {
        $logServicos = $this->model->fill($data);
        $logServicos->saveOrFail();

        return $this->model->where("servicos", $data ["servicos"])->get();
    }

    public function updateLog($data)
    {
        $logServicos = $this->model->where("servicos", $data ["servicos"])->first();
        foreach ($data as $field => $value) {
            $logServicos->$field = $value;
        }

        $logServicos->saveOrFail();
        return $this->model->where("servicos", $data ["servicos"])->get();
    }

    public function deleteLog($data)
    {
        try {
            $logServicos = $this->model->fill($data);
            $logServicos->delete();

            return $this->model->where("servicos", $data ["servicos"])->get();

        } catch (\Exception $exception) {
            return response()->json(['success' => false, 'error' => $exception->getMessage()], $exception->getCode());
        }
    }

}

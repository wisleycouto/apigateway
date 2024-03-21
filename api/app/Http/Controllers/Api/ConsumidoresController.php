<?php

namespace App\Http\Controllers\Api;

use App\Contato;
use App\Http\Controllers\Controller;
use App\Http\Requests\ConsumidorServicosRequest;
use App\Services\Classes\ConsumidorIpsService;
use App\Services\Classes\ConsumidorService;
use App\Services\Classes\ConsumidorServicosService;
use Illuminate\Http\Request;

use App\Http\Requests\ConsumidorCreateRequest;
use App\Http\Requests\ConsumidorUpdateRequest;
use App\Http\Requests\ConsumidorDeleteRequest;


class ConsumidoresController extends Controller
{
    private $consumidorService;
    private $consumidorServicosService;

    public function __construct(ConsumidorService $consumidorService, ConsumidorServicosService $consumidorServicosService)
    {
        $this->consumidorService = $consumidorService;
        $this->consumidorServicosService = $consumidorServicosService;
    }

    public function create(ConsumidorCreateRequest $request)
    {
        try {

            $consumidores = $this->consumidorService->createConsumidores($request->all());

            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $consumidores
            ]);

        } catch (\Exception $exception) {
            return response()->json([$exception->getMessage()],500);
        }
    }

    public function createConsumidorServicos(ConsumidorServicosRequest $request)
    {
        try {
            $consumidores = $this->consumidorServicosService->createConsumidorServicos(["id_consumidor" => $request->id_consumidor,"id_servicos_olinda"=>$request->id_servicos_olinda]);

            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $consumidores
            ]);
        }catch (\Exception $exception){
            return response()->json([$exception->getMessage()], $exception->getCode());
        }
    }

    public function update($id, ConsumidorUpdateRequest $request)
    {

        $dados = $request->all();
        $dados['id_consumidor'] = $id;

        try {
            $consumidores = $this->consumidorService->updateConsumidores($dados);
            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $consumidores
            ]);

        } catch (\Exception $exception) {
            return response()->json([$exception->getMessage()], $exception->getCode());
        }
    }

    public function delete($id)
    {
        try {
            $consumidores = $this->consumidorService->deleteConsumidores($id);
            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $consumidores
                ]);

        }catch (\Exception $exception){
            return response()->json([$exception->getMessage()], $exception->getCode());
        }
    }

    public function restore($id)
    {
        try {
            $consumidores = $this->consumidorService->restoreConsumidores($id);
            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $consumidores
            ]);

        }catch (\Exception $exception){
            return response()->json([$exception->getMessage()], $exception->getCode());
        }
    }

    public function get($id)
    {
        try {
                $consumidores = $this->consumidorService->get($id);

                return \response()->json([
                    'error' => false,
                    'msg' => 'Success',
                    'data' => $consumidores
                ]);

        }catch (\Exception $exception){
            return response()->json([$exception->getMessage()], $exception->getCode());
        }
    }

    public function getAll()
    {
        try {
            $consumidores = $this->consumidorService->listConsumidores();

            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $consumidores
            ]);

        }catch (\Exception $exception){
            return response()->json([$exception->getMessage()], $exception->getCode());
        }
    }

    public function getServicos($id)
    {
        try {
            $consumidores = $this->consumidorService->listServicosConsumidor($id);

            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $consumidores
            ]);

        }catch (\Exception $exception){
            return response()->json([$exception->getMessage()], $exception->getCode());
        }
    }

    public function deleteConsumidorServicos($idSevicoConsumidor)
    {
        try {
            $consumidores = $this->consumidorService->deleteConsumidorServico($idSevicoConsumidor);

            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $consumidores
            ]);
        }catch (\Exception $exception){
            return response()->json([$exception->getMessage()], $exception->getCode());
        }
    }

    public function restoreConsumidorServicos($idSevicoConsumidor)
    {
        try {
            $consumidores = $this->consumidorService->restoreConsumidorServico($idSevicoConsumidor);

            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $consumidores
            ]);
        }catch (\Exception $exception){
            return response()->json([$exception->getMessage()], $exception->getCode());
        }
    }

}

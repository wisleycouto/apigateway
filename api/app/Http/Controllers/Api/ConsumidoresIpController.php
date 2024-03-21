<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ConsumidorIpUpdateRequest;
use App\Models\ConsumidorIp;
use App\Services\Classes\ConsumidorIpsService;
use Illuminate\Http\Request;
use App\Http\Requests\ConsumidorIpRequest;



class ConsumidoresIpController extends Controller
{
    private $consumidorIpService;

    public function __construct(ConsumidorIpsService  $consumidorIpService)
    {
        $this->consumidorIpService = $consumidorIpService;

    }

    public function create(ConsumidorIpRequest  $request)
    {

        try {

            $consumidoresIp = $this->consumidorIpService->createConsumidoresIps(["id_consumidor" => $request->id_consumidor,"ip"=>$request->ip]);

            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $consumidoresIp
            ]);

        } catch (\Exception $exception) {
            return response()->json([$exception->getMessage()], $exception->getCode());
        }
    }

    public function update($id, ConsumidorIpUpdateRequest $request)
    {
        $dados = $request->all();

        try {
           $consumidoresIp = $this->consumidorIpService->updateConsumidoresIps($id,$dados);

            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $consumidoresIp
            ]);

        } catch (\Exception $exception) {

            return response()->json([$exception->getMessage()], $exception->getCode());
        }
    }

    public function delete($id)
    {
        try {
            $consumidoresIp = $this->consumidorIpService->deleteConsumidoresIps($id);

            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $consumidoresIp
            ]);

        }catch (\Exception $exception) {dd($exception->getMessage());

            return response()->json([$exception->getMessage()], $exception->getCode());
        }
    }

    public function restore($id)
    {
        try {
            $consumidoresIp = $this->consumidorIpService->restoreConsumidoresIps($id);

            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $consumidoresIp
            ]);

        }catch (\Exception $exception) {dd($exception->getMessage());

            return response()->json([$exception->getMessage()], $exception->getCode());
        }
    }

    public function get()
    {
        try {
            $consumidoresIp = $this->consumidorIpService->listConsumidoresIp();

            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $consumidoresIp
            ]);

        }catch (\Exception $exception) {

            return response()->json([$exception->getMessage()], $exception->getCode());
        }
    }

    public function getIpsConsumidor($id)
    {
        try {
                $consumidoresIp = $this->consumidorIpService->listIpsByConsumidorId($id);

            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $consumidoresIp
            ]);

        }catch (\Exception $exception) {

            return response()->json([$exception->getMessage()], $exception->getCode());
        }
    }

    public function getIpsGeral()
    {
        try {
            $consumidoresIp = $this->consumidorIpService->listIps();

            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $consumidoresIp
            ]);

        }catch (\Exception $exception) {

            return response()->json([$exception->getMessage()], $exception->getCode());
        }
    }
}

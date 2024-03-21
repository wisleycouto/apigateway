<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServicoOlindaRequest;
use App\Http\Requests\ServicoOlindaUpdateRequest;
use App\Models\ServicoOlinda;
use App\Services\Classes\ServicosOlindaService;
use Illuminate\Http\Request;




class ServicosOlindaController extends Controller
{

    private $servicosOlindaService;

    public function __construct(ServicosOlindaService $servicosOlindaService)
    {
        $this->servicosOlindaService = $servicosOlindaService;
    }

    public function create(ServicoOlindaRequest $request)
        {

        try {

            $servicosOlinda = $this->servicosOlindaService->createServicosOlinda($request->all());

            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $servicosOlinda
            ]);

        } catch (\Exception $exception) {
            dd($exception->getMessage());
            return response()->json([$exception->getMessage()], $exception->getCode());
        }
    }

    public function update($id,ServicoOlindaUpdateRequest $request)
    {
        $dados = $request->all();

        try {
           $servicosOlinda = $this->servicosOlindaService->updateServicosOlinda($id, $dados);

            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $servicosOlinda
            ]);

        } catch (\Exception $exception) {

            return response()->json([$exception->getMessage()], $exception->getCode());
        }
    }

    public function delete($id)
    {
        try {
            $servicosOlinda = ServicoOlinda::findOrFail($id);
            $servicosOlinda->delete();
            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $servicosOlinda
            ]);

        }catch (\Exception $exception) {
            return response()->json([$exception->getMessage()], $exception->getCode());
        }
    }

    public function get()
    {
        try {
            $servicosOlinda = $this->servicosOlindaService->listServicosOlinda();

            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $servicosOlinda
            ]);

        }catch (\Exception $exception) {
            return response()->json([$exception->getMessage()], $exception->getCode());
        }

    }

    public function getPrivado()
    {
        try {
            $servicosOlinda = $this->servicosOlindaService->listServicosOlindaPrivados();

            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $servicosOlinda
            ]);

        }catch (\Exception $exception) {
            return response()->json([$exception->getMessage()], $exception->getCode());
        }

    }

    public function getId($id)
    {
        try {
            $servicosOlinda = $this->servicosOlindaService->listIdServico($id);

            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $servicosOlinda
            ]);
        }catch (\Exception $exception) {

            return response()->json([$exception->getMessage()], $exception->getCode());
        }
    }

    public function restore($id){
        try {
            $servicosOlinda = ServicoOlinda::withTrashed()->findOrFail($id);
            $servicosOlinda->restore();
            return \response()->json([
                'error' => false,
                'msg' => 'Success',
                'data' => $servicosOlinda
            ]);

        }catch (\Exception $exception) {
            return response()->json([$exception->getMessage()], $exception->getCode());
        }
    }

}

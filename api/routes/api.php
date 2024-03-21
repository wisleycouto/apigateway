<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/', function(){

    return response(json_encode(['laravel_version' => app()->version(), 'app_version' => config('app.version')]))
        ->header('Access-Control-Allow-Origin',' *')
        ->header('Access-Control-Allow-Methods', '*')
        ->header('Access-Control-Allow-Headers', '*');
    ;
});

Route::group(['prefix' => 'olinda'], function () {
    Route::post('/consultar-olinda', 'Api\OlindaController@consultarOlinda')->name('olinda.consultar-olinda')->middleware('checkUser');
    Route::get('/consultar-olinda-bi', 'Api\OlindaController@consultarOlindapowerbi')->name('olinda.consultar-olinda--bi')->middleware('checkUser');
    Route::get('/consultar-olinda-csv', 'Api\OlindaController@consultarOlindacsv')->name('olinda.consultar-olinda--csv')->middleware('checkUser');
    Route::post('/consultar-filtros-servico', 'Api\OlindaController@consultarFiltrosServico')->name('olinda.consultar-filtros-servico')->middleware('checkUser');
    Route::get('/consultar-documentacao-filtro', 'Api\OlindaController@consultarDocumentacaoFiltro')->name('olinda.consultar-documentacao-filtro');
    Route::get('/consultar-portal', 'Api\OlindaController@consultarPortal')->name('olinda.consultar-portal')->middleware('checkUser');
}); 

Route::post('/connect', 'Api\LoginController@login');

Route::group(['prefix' => 'consumidor'], function () {
    Route::get('/', 'Api\ConsumidoresController@getAll');
    Route::get('/{id}', 'Api\ConsumidoresController@get');
    Route::post('/create', 'Api\ConsumidoresController@create');
    Route::post('/update/{id}' , 'Api\ConsumidoresController@update');
    Route::delete('/delete/{id}' , 'Api\ConsumidoresController@delete');
    Route::post('/restore/{id}' , 'Api\ConsumidoresController@restore');

    Route::post('/insert-service/{id_consumidor}', 'Api\ConsumidoresController@createConsumidorServicos');
    Route::delete('/service/{idSevicoConsumidor}', 'Api\ConsumidoresController@deleteConsumidorServicos');
    Route::post('/service/{idSevicoConsumidor}', 'Api\ConsumidoresController@restoreConsumidorServicos');
    Route::get('/list-service/{id_consumidor}', 'Api\ConsumidoresController@getServicos');
});

Route::group(['prefix' => 'ips'], function () {
    Route::post('/create/{id_consumidor}', 'Api\ConsumidoresIpController@create');
    Route::post('/update/{id}' , 'Api\ConsumidoresIpController@update');
    Route::post('/restore/{id}' , 'Api\ConsumidoresIpController@restore');
    Route::delete('/delete/{id}' , 'Api\ConsumidoresIpController@delete');
    Route::get('/get', 'Api\ConsumidoresIpController@get');
    Route::get('/get-ips/{id_consumidor}', 'Api\ConsumidoresIpController@getIpsConsumidor');
    Route::get('/get-ips', 'Api\ConsumidoresIpController@getIpsGeral');
});

Route::group(['prefix' => 'servicos'], function () {
    Route::post('/create', 'Api\ServicosOlindaController@create');
    Route::post('/update/{id}' , 'Api\ServicosOlindaController@update');
    Route::delete('/delete/{id}' , 'Api\ServicosOlindaController@delete');
    Route::post('/restore/{id}' , 'Api\ServicosOlindaController@restore');
    Route::get('/get', 'Api\ServicosOlindaController@get');
    Route::get('/privados/get', 'Api\ServicosOlindaController@getPrivado');
    Route::get('/get-servicos/{id}', 'Api\ServicosOlindaController@getId');
});

/*Route::group(['prefix' => 'consumdior-ip'], function(){
    Route::get('/get', 'Api\ConsumidoresIpController@get');
});*/









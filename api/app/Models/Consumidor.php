<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Consumidor extends Model
{
    use SoftDeletes;

    protected $table = 'tb_consumidor';
    protected $primaryKey = 'id_consumidor';
    protected $fillable = [
        "consumidor", "data_inicio", "data_fim", "num_sei", "email_responsavel", "nome_responsavel", "telefone_responsavel", "token_acesso"
    ];

    protected $casts = [
        'data_inicio' => 'date:Y-m-d',
        'data_fim' => 'date:Y-m-d',
    ];

    public function consumidorIp()
    {
        return $this->hasMany(ConsumidorIp::class, 'id_consumidor', 'id_consumidor');
    }

    public function consumidorServices()
    {
        return $this->hasMany(ConsumidorServico::class, 'id_consumidor', 'id_consumidor');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Consumidor;
use App\Models\ServicoOlinda;

class ConsumidorServico extends Model
{
    use SoftDeletes;

    protected $table = "tb_consumidor_servicos";
    protected $primaryKey = "id_consumidor_servicos";
    protected $fillable = [
        "id_consumidor", "id_servicos_olinda"
    ];

    public function consumidor()
    {
        return $this->belongsTo(Consumidor::class, "id_consumidor", "id_consumidor");
    }

    public function consumidorServicoOlinda()
    {
        return $this->belongsTo(ServicoOlinda::class, "id_servicos_olinda", "id_servicos_olinda");
    }
}

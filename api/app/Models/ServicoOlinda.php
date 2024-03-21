<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServicoOlinda extends Model
{
    use SoftDeletes;

    protected $table = 'tb_servicos_olinda';
    protected $primaryKey = 'id_servicos_olinda';
    protected $fillable = [
        "nome_servico", "url_servico", "servico_publico", "servico"
    ];

    public function servicosOlinda()
    {
        return $this->hasMany(ConsumidorServico::class, 'id_servicos_olinda', 'id_servicos_olinda');
    }
}

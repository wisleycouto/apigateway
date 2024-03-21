<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ConsumidorIp extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'id_consumidor_ip';
    protected $table = "tb_consumidor_ip";
    protected $fillable = [
        "id_consumidor", "ip"
    ];

    public function consumidor()
    {
        return $this->belongsTo(Consumidor::class, 'id_consumidor', 'id_consumidor');
    }
}

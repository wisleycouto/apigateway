<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTbConsumidorServicosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_consumidor_servicos', function (Blueprint $table) {
            $table->increments("id_consumidor_servicos");
            $table->unsignedBigInteger('id_consumidor');
            $table->unsignedBigInteger('id_servicos_olinda');
            $table->timestamps();
            $table->foreign('id_consumidor')->references('id_consumidor')->on('tb_consumidor');
            $table->foreign('id_servicos_olinda')->references('id_servicos_olinda')->on('tb_servicos_olinda');

            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_consumidor_servicos');
    }
}

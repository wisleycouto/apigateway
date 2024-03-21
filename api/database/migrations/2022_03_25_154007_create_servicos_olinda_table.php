<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServicosOlindaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_servicos_olinda', function (Blueprint $table) {
            $table->increments('id_servicos_olinda');
            $table->string('nome_servico');
            $table->string('url_servico');
            $table->boolean('servico_publico')->comment("senha autentificação = '0 true', '1 false'");
            $table->timestamps();

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
        Schema::dropIfExists('tb_servicos_olinda');
    }
}

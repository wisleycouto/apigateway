<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConsumidoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_consumidor', function (Blueprint $table) {
            $table->increments('id_consumidor');
            $table->date('data_inicio');
            $table->date('data_fim');
            $table->string('client_id');
            $table->string('client_user');
            $table->string('client_password');
            $table->string('num_sei');
            $table->string('email_responsavel');
            $table->string('nome_responsavel');
            $table->string('telefone_responsavel');
            $table->timestamps();

            /**
             * This part is necessary for us to use the soft-delete feature.
             */

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
        Schema::dropIfExists('tb_consumidor');
    }
}

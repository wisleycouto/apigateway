<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConsumidoresIpsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_consumidor_ip', function (Blueprint $table) {
            $table->increments('id_consumidor_ip');
            $table->unsignedBigInteger('id_consumidor');
            $table->string('ip');
            $table->timestamps();
            $table->foreign('id_consumidor')->references('id_consumidor')->on('tb_consumidor');

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
        Schema::dropIfExists('tb_consumidor_ip');
    }
}

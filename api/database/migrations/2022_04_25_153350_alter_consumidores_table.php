<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterConsumidoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tb_consumidor', function (Blueprint $table) {

            $table->dropColumn('client_id');
            $table->dropColumn('client_user');
            $table->dropColumn('client_password');
            $table->string('num_sei')->nullable()->change();

        });
    }

    public function down()
    {
        Schema::table('tb_consumidor', function (Blueprint $table){
            $table->string('client_id');
            $table->string('client_user');
            $table->string('client_password');
        });
    }
}

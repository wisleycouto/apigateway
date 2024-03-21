#!/bin/sh

php artisan key:generate

php artisan migrate 

#php artisan db:seed --class=UsuarioSeeder
php artisan db:seed

exec "$@"

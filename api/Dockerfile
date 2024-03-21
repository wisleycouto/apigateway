FROM php:7.4-apache

ENV APP_ENV=${APP_ENV}
ENV APP_DEBUG=${APP_DEBUG}
ENV APP_URL=${APP_URL}
ENV DATABASE_DRIVER=${DATABASE_DRIVER}
ENV DATABASE_HOST=${DATABASE_HOST}
ENV DATABASE_PORT=${DATABASE_PORT}
ENV DATABASE_NAME=${DATABASE_NAME}
ENV DATABASE_USER=${DATABASE_USER}
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
ENV TZ=America/Sao_Paulo
ENV TOKEN_ACCESS=${TOKEN_ACCESS}
ENV REACT_APP_BACKEND_TOKEN=${REACT_APP_BACKEND_TOKEN}
ENV REACT_APP_URL=${REACT_APP_URL}
ENV REACT_APP_BASE_URL_BACKEND=${REACT_APP_BASE_URL_BACKEND}


RUN set -eux \
    && apt-get update \
    && apt-get install -y --no-install-recommends wget unzip libxslt-dev libldap2-dev libmcrypt-dev libpq-dev libxml2-dev libfreetype6-dev libjpeg62-turbo-dev libpng-dev libtidy-dev zlib1g-dev libzip-dev zip \
    && pecl install xdebug-2.9.8 apcu \
    && pecl install timezonedb \
    && a2enmod rewrite \
    && docker-php-ext-enable timezonedb \
    && docker-php-ext-configure gd --with-jpeg --with-freetype --with-jpeg \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install -j$(nproc) iconv gd intl pdo_pgsql pgsql soap zip ldap \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
    
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
 	&& HASH="$(wget -q -O - https://composer.github.io/installer.sig)" \
 	&& php -r "if (hash_file('SHA384', 'composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
 	&& php composer-setup.php --install-dir=/usr/local/bin --filename=composer


COPY ./ /var/www/html/api
COPY ./docker/php_config/php-extras.ini /usr/local/etc/php/conf.d/php-extras.ini
COPY ./docker/apache_config/000-default.conf /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html/api

RUN set -eux \
    && mkdir -p /var/www/html/api/var/cache \
    && chown www-data:www-data -R /var/www/html/api \
    && chmod 777 -R var/cache \
	&& mkdir -p storage/log \
    && mkdir -p storage/logs \
    && chmod 777 -R storage/log \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && mv .env.example .env \
    && chmod +x docker/entrypoint.sh

ENTRYPOINT ["docker/entrypoint.sh"]

EXPOSE 80

CMD ["apache2ctl","-D","FOREGROUND"]
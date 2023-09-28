FROM php:8.2-apache

RUN apt-get update && \
    apt-get install -y \
    libmagickwand-dev && \
    pecl install imagick && \
    docker-php-ext-enable imagick && \
    docker-php-ext-install mysqli pdo pdo_mysql

COPY php-app/src /var/www/html/php
COPY php-app/vendor/ /var/www/html/php/vendor
COPY php-app/config /var/www/html/php/config

EXPOSE 80

CMD ["apache2-foreground"]

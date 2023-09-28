FROM php:8.2-apache

RUN apt-get update && \
    apt-get install -y \
    libmagickwand-dev && \
    pecl install imagick && \
    docker-php-ext-enable imagick

COPY php-app/src /var/www/html/php

EXPOSE 80

CMD ["apache2-foreground"]

FROM php:8.2-apache

WORKDIR /var/www/html/php

# Enable mod_rewrite
RUN a2enmod rewrite

# Install system dependencies
RUN apt-get update

# Install ImageMagick dependencies
RUN apt-get install -y libmagickwand-dev

# Install the Imagick extension
RUN pecl install imagick
RUN docker-php-ext-enable imagick
# Modify the ImageMagick policy file to allow PDF processing
RUN sed -i 's|<policy domain="coder" rights="none" pattern="PDF" />|<policy domain="coder" rights="read" pattern="PDF" />|' /etc/ImageMagick-6/policy.xml

# Install GD dependencies
RUN apt-get install -y libjpeg-dev libfreetype6-dev libpng-dev
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install -j$(nproc) gd

# Install MySQLi extension
RUN docker-php-ext-install mysqli
RUN docker-php-ext-enable mysqli

# Install libzip and the Zip extension
RUN apt-get install -y libzip-dev
RUN docker-php-ext-install zip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Create log directory & set permissions
RUN mkdir -p /var/log/navplan/
RUN chmod -R 777 /var/log/navplan/

# Create temp directory & set permissions
RUN mkdir -p /var/www/html/tmp/
RUN chmod -R 777 /var/www/html/tmp/

# Copy Meteo DWD sample files
COPY meteo_dwd /var/www/html/meteo_dwd

# Copy composer files
COPY php-app/composer.json /var/www/html/php/composer.json
RUN composer update

# Copy url rewrite configuration
COPY php-app/api /var/www/html/api

# Copy Code
COPY php-app/src /var/www/html/php
COPY php-app/config /var/www/html/php/config

EXPOSE 80

CMD ["apache2-foreground"]

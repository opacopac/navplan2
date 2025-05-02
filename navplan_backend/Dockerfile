FROM php:8.2-apache

WORKDIR /var/www/html/php

# Enable mod_rewrite
RUN a2enmod rewrite

# Install system dependencies (for Rust + PHP extensions) and cleanup
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    libssl-dev \
    pkg-config \
    libmagickwand-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libpng-dev \
    libzip-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Rust using rustup
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y

# Add Rust binaries to PATH
ENV PATH="/root/.cargo/bin:${PATH}"

# Install and enable PHP extensions
RUN pecl install imagick && docker-php-ext-enable imagick \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd mysqli zip \
    && docker-php-ext-enable mysqli

# Allow PDF processing in ImageMagick
RUN sed -i 's|<policy domain="coder" rights="none" pattern="PDF" />|<policy domain="coder" rights="read" pattern="PDF" />|' /etc/ImageMagick-6/policy.xml

# Set PHP file upload parameters
RUN echo "upload_max_filesize=50M\npost_max_size=50M" > /usr/local/etc/php/conf.d/uploads.ini

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Create log & temp directories and set permissions
RUN mkdir -p /var/log/navplan/ /var/www/html/tmp/ && chmod -R 777 /var/log/navplan/ /var/www/html/tmp/

# Copy sample meteo data
COPY meteo_dwd /var/www/html/meteo_dwd

# Copy sample terrain tiles
RUN mkdir -p /var/www/html/terraintiles && \
    for tile in N46E006 N46E007 N46E008 N46E009 N46E010 N47E006 N47E007 N47E008 N47E009 N47E010; do \
        curl -o /var/www/html/terraintiles/${tile}.hgt https://www.navplan.ch/terraintiles/${tile}.hgt; \
    done

# Install PHP dependencies
COPY php-app/composer.json /var/www/html/php/composer.json
RUN composer update

# Copy application code files
COPY php-app/api /var/www/html/api
COPY php-app/src /var/www/html/php
COPY php-app/config /var/www/html/php/config

EXPOSE 80

CMD ["apache2-foreground"]

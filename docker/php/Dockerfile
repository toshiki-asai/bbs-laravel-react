FROM php:8.4-fpm
LABEL maintainer="toshiki-asai <codetrain.toshiki.asai@gmail.com>"
SHELL ["/bin/bash", "-oeux", "pipefail", "-c"]

ARG WORKDIR_BACK \
    DOCKERDIR

# timezone environment
ENV TZ=Asia/Tokyo \
  # locale
  LANG=ja_JP.UTF-8 \
  LANGUAGE=ja_JP:ja \
  LC_ALL=ja_JP.UTF-8 \
  # composer environment
  COMPOSER_ALLOW_SUPERUSER=1 \
  COMPOSER_HOME=/composer

#composer
COPY --from=composer:2.9.2 /usr/bin/composer /usr/bin/composer

RUN apt-get update && \
  apt-get -y install git libicu-dev libonig-dev libzip-dev libpq-dev unzip locales && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  locale-gen ja_JP.UTF-8 && \
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8 && \
  mkdir /var/run/php-fpm && \
  docker-php-ext-install intl pdo_pgsql zip bcmath && \
  composer config -g process-timeout 3600 && \
  composer config -g repos.packagist composer https://packagist.org

COPY ${DOCKERDIR}/php/php-fpm.d/zzz-www.conf /usr/local/etc/php-fpm.d/zzz-www.conf
COPY ${DOCKERDIR}/php/php.ini /usr/local/etc/php/php.ini

WORKDIR ${WORKDIR_BACK}

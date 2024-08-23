#!/bin/sh

cd /app
composer install --no-dev
npm install --dev
npx webpack --mode=production
#source /entrypoint

supervisord
#php-fpm -D
#/usr/sbin/nginx -g 'daemon off;' $SERVICE_NGINX_OPTS
#echo 'test'

#tail -f /dev/null
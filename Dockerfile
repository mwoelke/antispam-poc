FROM webdevops/php-nginx:8.2-alpine

RUN apk --no-cache add --update nodejs npm 

#ENTRYPOINT ["/app/entrypoint.sh"]
ENTRYPOINT ["/entrypoint"]
CMD ["/app/entrypoint.sh"]
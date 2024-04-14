FROM mongo:latest

COPY ./init-script.js /docker-entrypoint-initdb.d/
RUN chmod +x /docker-entrypoint-initdb.d/init-script.js



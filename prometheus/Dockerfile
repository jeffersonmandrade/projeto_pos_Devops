FROM prom/prometheus:latest
COPY prometheus.yml /etc/prometheus/
CMD [ "--config.file=/etc/prometheus/prometheus.yml" ]
ARG PORT=9090
EXPOSE $PORT

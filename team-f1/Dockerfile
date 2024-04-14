FROM node:latest
COPY .  /app
ARG PORT=4000
WORKDIR /app
ENV PORT=$PORT
EXPOSE $PORT
RUN npm install
ENTRYPOINT [ "npm","start" ]

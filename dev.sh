#! /bin/bash

npx dotenvx decrypt -f .env.development

docker compose --env-file .env.development up -d 

npx dotenvx encrypt -f .env.development

npx dotenvx run -f .env.development --debug -- nodemon | pino-pretty
#!/usr/bin/env bash

CMD=$2
: ${CMD:=/bin/bash}

docker start annio-payment-service-dev
docker exec -it annio-payment-service-dev ${CMD}

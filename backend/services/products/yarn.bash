#!/bin/sh

if [[ $NODE_ENV == 'prod' ]]; then
    echo 'Running in mode prod...'
    yarn start
else 
    echo 'Running in mode development...'
    yarn dev
fi
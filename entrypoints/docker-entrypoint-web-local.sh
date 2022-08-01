#!/bin/sh

set -e

if [ -f tmp/pids/server-3000.pid ]; then
  rm tmp/pids/server-3000.pid
fi

echo "Staring local entrypoint script"

rake db:create
rake db:migrate

echo 'JS'
pm2 start yarn --interpreter bash --name js-runner -- build:watch

echo 'CSS'
pm2 start yarn --interpreter bash --name css-runner -- build:css:watch

echo 'Rails'
bundle exec rails s -b 0.0.0.0

#!/bin/sh

set -e

if [ -f tmp/pids/server-28080.pid ]; then
  rm tmp/pids/server-28080.pid
fi

bundle exec puma -p 28080 cable/config.ru

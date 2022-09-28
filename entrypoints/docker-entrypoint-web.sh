#!/bin/sh

set -e

if [ -f tmp/pids/server-3000.pid ]; then
  rm tmp/pids/server-3000.pid
fi

rake db:create
rake db:migrate
#yarn build
#yarn build:css
rake assets:precompile
bundle exec rails s -b 0.0.0.0

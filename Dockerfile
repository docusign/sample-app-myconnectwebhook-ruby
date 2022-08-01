FROM ruby:latest

# ENV BUNDLER_VERSION=2.0.2

RUN apt-get update -qq \
&& apt-get install -y nodejs

RUN apt remove cmdtest
RUN apt remove yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq
RUN apt install yarn -y
RUN apt install npm -y
RUN apt install postgresql-client -y
RUN gem install bundler
RUN apt-get install -y dos2unix

WORKDIR /app

COPY package.json yarn.lock Gemfile Gemfile.lock ./

RUN npm install -g sass
RUN npm install -g esbuild
RUN npm install pm2 -g
RUN yarn install

COPY . .

RUN chmod +x ./entrypoints/docker-entrypoint-web.sh
RUN chmod +x ./entrypoints/docker-entrypoint-web-local.sh
RUN chmod +x ./entrypoints/docker-entrypoint-websocket.sh

# convert file line endings to unix format
RUN dos2unix ./entrypoints/docker-entrypoint-web.sh
RUN dos2unix ./entrypoints/docker-entrypoint-web-local.sh
RUN dos2unix ./entrypoints/docker-entrypoint-websocket.sh

#remove dos2unix utility
RUN apt-get --purge remove -y dos2unix && rm -rf /var/lib/apt/lists/*

RUN bundle check || bundle install

# RUN bundle exec rake assets:precompile
# CMD ["sh", "/app/entrypoints/docker-entrypoint-web.sh"]
CMD ["bash"]
# CMD ["rails", "server", "-b", "0.0.0.0"]
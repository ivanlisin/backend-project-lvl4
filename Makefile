setup: prepare install db-migrate

install:
	npm install

db-migrate:
	npx knex migrate:latest

load-data:
	npx knex seed:run

debug-data:
	./server/bin/users.js

build:
	npm run build

prepare:
	cp -n .env.example .env || true

start:
	heroku local -f Procfile.dev

start-backend:
	npm start -- --watch --verbose-watch --ignore-watch='node_modules .git .sqlite'

start-frontend:
	npx webpack --watch --progress

lint:
	npx eslint .

test:
	npm test -s

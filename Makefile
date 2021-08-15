setup:
	npm install
	npx knex migrate:latest

build:
	npm run build

start:
	heroku local -f Procfile.dev

start-frontend:
	npx webpack serve

start-backend:
	npx nodemon --exec npx babel-node server/bin/server.js

lint:
	npx eslint .

test:
	npm test -- --watch

test-coverage:
	npm test -- --coverage

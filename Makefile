# main commands

setup:
	npm install
	npx knex migrate:latest

build:
	npm run build

start:
	npx nodemon --exec npx babel-node server/bin/server.js


# development

test:
	npm test -- --watch

start-frontend:
	npx webpack serve

start-backend:
	npx nodemon --exec npx babel-node server/bin/server.js


# code quality

lint:
	npx eslint .

test-coverage:
	npm test -- --coverage

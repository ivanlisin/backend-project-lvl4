install: install-deps

install-deps:
	npm ci

test:
	npm test

test-watch:
	npm test -- --watch

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

build:
	npm run build

start-backend:
	npx nodemon --exec npx babel-node server/bin/server.js

start-frontend:
	npx webpack serve

.PHONY: test

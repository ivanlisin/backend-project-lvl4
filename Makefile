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

start:
	nodemon server/bin/server.js

.PHONY: test

.PHONY: full clean lint lint-npm lint-go fix fix-npm fix-go test test-npm test-go build build-npm build-go dev-npm dev-go watch watch-npm watch-go docker-build docker-test docs-go

SHELL=/bin/bash -o pipefail
$(shell git config core.hooksPath ops/git-hooks)
GO_PATH := $(shell go env GOPATH 2> /dev/null)
PATH := /usr/local/bin:$(GO_PATH)/bin:$(PATH)

full: clean lint test build

## Clean the project of temporary files
clean:
	git clean -Xdff --exclude="!.env.local" --exclude="!.env.*.local"

## Lint the project
lint: lint-npm lint-go

lint-npm:
	npm install
	npm run lint

lint-go:
	@go install github.com/golangci/golangci-lint/v2/cmd/golangci-lint@v2.1.5
	go mod tidy
	golangci-lint run ./...

## Fix the project
fix: fix-npm fix-go

fix-npm:
	npm install
	npm run fix

fix-go:
	go mod tidy
	gofmt -s -w .

## Test the project
test: test-npm test-go

test-npm:
	npm install
	npm run test

test-go:
	@go install github.com/boumenot/gocover-cobertura@latest
	@mkdir -p .config/tmp/coverage/go/
	go test -cover -coverprofile .config/tmp/coverage/go/profile.txt ./...
	@go tool cover -func .config/tmp/coverage/go/profile.txt | awk '/^total/{print $$1 " " $$3}'
	@go tool cover -html .config/tmp/coverage/go/profile.txt -o .config/tmp/coverage/go/coverage.html
	@gocover-cobertura < .config/tmp/coverage/go/profile.txt > .config/tmp/coverage/go/cobertura-coverage.xml

## Build the project
build: build-npm build-go

build-npm:
	npm install
	npm run build

build-go:
	go generate
	go build -ldflags='-s -w' -o .config/tmp/build/hestia .
	go install .

dev-npm: build-npm

dev-go:
	go run . | jq

## Watch the project
watch:
	hera

watch-npm:
	npm install
	hera frontend

watch-go:
	hera backend

docker-build:
	docker build -t 'ghcr.io/lunagic/hestia:latest' .

docker-test: docker-build
	docker run --rm -it -p 2222:2222/tcp ghcr.io/lunagic/hestia:latest

## Run the docs server for the project
docs-go:
	@go install golang.org/x/tools/cmd/godoc@latest
	@echo "listening on http://127.0.0.1:6060/pkg/github.com/lunagic/hestia"
	@godoc -http=127.0.0.1:6060

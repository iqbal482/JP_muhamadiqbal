# env
BINARY = main
BIN = bin
VET_REPORT = vet.report
TEST_REPORT = tests.xml
VERSION ?=?
COMMIT = $(shell git rev-parse HEAD)
BRANCH = $(shell git rev-parse --abbrev-ref HEAD)

# Symlink
GITHUB_USERNAME=iqbal482
BUILD_DIR=${GOPATH}/src/github.com/${GITHUB_USERNAME}/${BINARY}
CURRENT_DIR=$(shell pwd)
BUILD_DIR_LINK=$(shell readlink ${BUILD_DIR})

# Setup the -ldflags option for go build here, interpolate the variable values
LDFLAGS = -ldflags "-X main.VERSION=${VERSION} -X main.COMMIT=${COMMIT} -X main.BRANCH=${BRANCH}"

all: link clean vet compile docker-build

link:
	BUILD_DIR=${BUILD_DIR}; \
	BUILD_DIR_LINK=${BUILD_DIR_LINK}; \
	CURRENT_DIR=${CURRENT_DIR};
	if ["$${BUILD_DIR_LINK}" != "$${CURRENT_DIR}"]; then \
  		echo "Fixing symlink to build"; \
		rm -f $${BUILD_DIR}; \
		ln -s $${CURRENT_DIR} $${BUILD_DIR}; \
	fi

test:
	go test -v -cover -covermode=atomic ./...

build:
	go build -o bin/${BINARY} main.go

compile:
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -a -installsuffix cgo ${LDFLAGS} -o bin/${BINARY}-linux-amd64 main.go;

unittest:
	go test -short  ./...

clean:
	-rm -f ${TEST_REPORT}
	-rm -f ${VET_REPORT}
	-rm -f bin/${BINARY}-*

docker-build:
	docker build -t go-clean-arch .

docker-compose-run:
	docker-compose up --build -d

stop:
	docker-compose down

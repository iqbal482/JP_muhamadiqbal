FROM golang:alpine
ENV CGO_ENABLED=0
RUN apk update && apk add --no-cache git
WORKDIR $GOPATH/src/mypackage/myapp/
COPY . .
# Fetch dependencies.
# Using go get.
RUN go get -d -v
# Build the binary.
RUN go build -o /go/bin/main
EXPOSE 9090
ENTRYPOINT ["/go/bin/main"]

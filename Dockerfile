FROM alpine
ENV GO111MODULE=on
ENV CGO_ENABLED=0
ENV GOOS=linux
ENV GOARCH=amd64
ENV GOARCH=wasm
ENV GOOS=js
ADD bin /app
WORKDIR /app
EXPOSE 9090
CMD ["./main"]
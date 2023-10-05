#!/bin/bash
# If you encounter a protoc error, make sure to set up the symlink as described in the README.
mkdir -p ./proto/generated
grpc_tools_node_protoc \
  --proto_path=./proto \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --js_out=import_style=commonjs,binary:./proto \
  --ts_out=service=grpc-node:./proto \
  ./proto/chat.proto

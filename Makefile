proto:
    protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --proto_path=./src/proto --ts_proto_out=./src/auth auth.proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb
    protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --proto_path=./src/proto --ts_proto_out=./src/booking booking.proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb
    protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --proto_path=./src/proto --ts_proto_out=./src/file file.proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb
server:
    yarn start:dev
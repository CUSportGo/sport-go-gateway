proto:
	protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --proto_path=./src/proto --ts_proto_out=./src/auth auth.proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb
	protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --proto_path=./src/proto --ts_proto_out=./src/sportarea sportarea.proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb
	protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --proto_path=./src/proto --ts_proto_out=./src/user user.proto --ts_proto_opt=nestJs=true --ts_proto_opt=fileSuffix=.pb

server:
	yarn start:dev
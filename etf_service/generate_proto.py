from grpc_tools import protoc

protoc.main(
    (
        "",
        "-I../protos",
        "--python_out=./v1",
        "--grpc_python_out=./v1",
        "--pyi_out=./v1",
        "../protos/etf_service.proto",
    )
)

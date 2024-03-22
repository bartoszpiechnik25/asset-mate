from grpc_tools import protoc

protoc.main(
    (
        "",
        "-I../protos",
        "--python_out=./etf_service_pb3",
        "--grpc_python_out=./etf_service_pb3",
        "--pyi_out=./etf_service_pb3",
        "../protos/etf_service.proto",
    )
)

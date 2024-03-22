import grpc
import asyncio
import logging

from etf_service_pb3.etf_service_pb2_grpc import add_EtfServiceServicer_to_server
from v1.service import EtfServiceServicer


async def serve():
    server = grpc.aio.server()
    add_EtfServiceServicer_to_server(EtfServiceServicer(), server)
    server.add_insecure_port("[::]:50051")
    await server.start()
    await server.wait_for_termination()


if __name__ == "__main__":
    logging.basicConfig()
    print("Listening on localhost:50051")
    asyncio.get_event_loop().run_until_complete(serve())

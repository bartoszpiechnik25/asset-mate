import grpc
import asyncio

from v1.etf_service_pb2_grpc import add_EtfServiceServicer_to_server
from v1.service import EtfServiceServicer
from config import get_db, get_config

CONFIG = get_config()
DB = get_db(CONFIG)


async def serve():
    server = grpc.aio.server()
    add_EtfServiceServicer_to_server(
        EtfServiceServicer(DB, CONFIG["ETF_COLLECTION"]), server
    )
    server.add_insecure_port("[::]:50051")
    await server.start()
    await server.wait_for_termination()


if __name__ == "__main__":
    print("Listening on localhost:50051")
    asyncio.get_event_loop().run_until_complete(serve())

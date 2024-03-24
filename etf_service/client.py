import grpc
import asyncio
from v1.etf_service_pb2 import EtfByTicker
from v1.etf_service_pb2_grpc import EtfServiceStub


async def get_etf_by_ticker(stub: EtfServiceStub):
    ticker = EtfByTicker(yahoo_symbol="XDWT.DE")
    print(ticker)
    return await stub.GetEtf(ticker)


async def add_etf(stub: EtfServiceStub):
    etf = EtfByTicker(
        yahoo_symbol="IWDA.L",
    )
    return await stub.AddEtf(etf)


async def run():
    async with grpc.aio.insecure_channel("localhost:50051") as channel:
        stub = EtfServiceStub(channel)
        print("-------------- GetEtf --------------")
        print(await get_etf_by_ticker(stub))
        print("-------------- AddEtf --------------")
        print(await add_etf(stub))


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(run())

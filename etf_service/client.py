import grpc
import asyncio
import v1.etf_service_pb2_grpc as etf_service_pb2_grpc
import v1.etf_service_pb2 as etf_service_pb2


async def get_etf_by_ticker(stub: etf_service_pb2_grpc.EtfServiceStub):
    ticker = etf_service_pb2.EtfByTicker(yahoo_symbol="XDWT.DE")
    print(ticker)
    return await stub.GetEtf(ticker)


async def add_etf(stub: etf_service_pb2_grpc.EtfServiceStub):
    etf = etf_service_pb2.EtfByTicker(
        yahoo_symbol="IWDA.L",
    )
    return await stub.AddEtf(etf)


async def run():
    async with grpc.aio.insecure_channel("localhost:50051") as channel:
        stub = etf_service_pb2_grpc.EtfServiceStub(channel)
        # print("-------------- GetEtf --------------")
        # print(await get_etf_by_ticker(stub))
        print("-------------- AddEtf --------------")
        print(await add_etf(stub))


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(run())

import v1.etf_service_pb2 as etf_service_pb3
import v1.etf_service_pb2_grpc as etf_service_pb3_grpc
import yahooquery as yq
import yfinance as yf
import asyncio


async def get_specifics(ticker: str, data: dict):
    etf_specifics = yq.Ticker(ticker)
    holding_info = etf_specifics.fund_holding_info[ticker]
    data["holdings"] = [
        etf_service_pb3.EtfHoldings(
            symbol=holding["symbol"],
            holding_name=holding["holdingName"],
            holding_percent=holding["holdingPercent"],
        )
        for holding in holding_info["holdings"]
    ]
    data["weights"] = [
        etf_service_pb3.SectorWeights(sector_name=key, sector_weight=value)
        for weight_obj in holding_info["sectorWeightings"]
        for key, value in filter(lambda x: x[1] > 0, weight_obj.items())
    ]
    data["expense_ratio"] = etf_specifics.fund_profile[ticker][
        "feesExpensesInvestment"
    ]["annualReportExpenseRatio"]


class EtfServiceServicer(etf_service_pb3_grpc.EtfServiceServicer):
    def __init__(self, db_collection, collection_name) -> None:
        super().__init__()
        self.db = db_collection[collection_name]

    async def GetEtf(self, request, context):
        # data, spec = {}, {}
        # specifics_task = asyncio.create_task(get_specifics(request.yahoo_symbol, spec))

        # etf = yf.Ticker(request.yahoo_symbol)
        # etf_info = etf.get_info()
        # data["name"] = etf_info["longName"]
        # data["currency"] = etf_info["currency"]
        # data["yahoo_symbol"] = etf_info["symbol"]

        # await specifics_task
        res = self.db.find({"yahoo_symbol": request.yahoo_symbol})
        for r in res:
            print(r)
        return etf_service_pb3.Etf()

    async def AddEtf(self, request, context):
        data, spec = {}, {}
        specifics_task = asyncio.create_task(get_specifics(request.yahoo_symbol, spec))

        etf = yf.Ticker(request.yahoo_symbol)
        etf_info = etf.get_info()
        data["name"] = etf_info["longName"]
        data["currency"] = etf_info["currency"]
        data["yahoo_symbol"] = etf_info["symbol"]
        data["last_close"] = etf_info["previousClose"]
        # data["total_assets"] = etf_info["totalAssets"]

        await specifics_task

        etf_data = {**data, **spec}
        self.db.insert_one(etf_data)

        return etf_service_pb3.Etf(**etf_data)

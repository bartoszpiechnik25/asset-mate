import v1.etf_service_pb2 as etf_service_pb3
import v1.etf_service_pb2_grpc as etf_service_pb3_grpc
import yahooquery as yq
import yfinance as yf
import asyncio


async def get_specifics(ticker: str, data: dict, message: dict):
    etf_specifics = yq.Ticker(ticker)
    holding_info = etf_specifics.fund_holding_info[ticker]

    message["holdings"], data["holdings"] = [], []
    for holding in holding_info["holdings"]:
        data["holdings"].append(
            {
                "symbol": holding["symbol"],
                "holding_name": holding["holdingName"],
                "holding_percent": holding["holdingPercent"],
            }
        )
        message["holdings"].append(
            etf_service_pb3.EtfHoldings(
                symbol=holding["symbol"],
                holding_name=holding["holdingName"],
                holding_percent=holding["holdingPercent"],
            )
        )

    message["weights"], data["weights"] = [], []
    for weight_obj in holding_info["sectorWeightings"]:
        for key, value in filter(lambda x: x[1] > 0, weight_obj.items()):
            message["weights"].append(
                etf_service_pb3.SectorWeights(sector_name=key, sector_weight=value)
            )
            data["weights"].append(
                {
                    "sector_name": key,
                    "sector_weight": value,
                }
            )
    data["expense_ratio"] = etf_specifics.fund_profile[ticker][
        "feesExpensesInvestment"
    ]["annualReportExpenseRatio"]


class EtfServiceServicer(etf_service_pb3_grpc.EtfServiceServicer):
    def __init__(self, db_collection, collection_name) -> None:
        super().__init__()
        self.db = db_collection[collection_name]

    async def GetEtf(self, request, context):
        res = self.db.find_one({"yahoo_symbol": request.yahoo_symbol}, {"_id": False})
        return etf_service_pb3.Etf(**res)

    async def AddEtf(self, request, context):
        data, spec, mesage = {}, {}, {}
        specifics_task = asyncio.create_task(
            get_specifics(request.yahoo_symbol, spec, mesage)
        )

        etf = yf.Ticker(request.yahoo_symbol)
        etf_info = etf.get_info()
        data["name"] = etf_info["longName"]
        data["currency"] = etf_info["currency"]
        data["yahoo_symbol"] = etf_info["symbol"]
        data["last_close"] = etf_info["previousClose"]
        data["total_assets"] = 0

        await specifics_task

        etf_db_data = {**data, **spec}
        etf_message = {**mesage, **spec}
        self.db.insert_one(etf_db_data)

        return etf_service_pb3.Etf(**etf_message)

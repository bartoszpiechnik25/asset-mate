import v1.etf_service_pb2 as etf_service_pb3
import v1.etf_service_pb2_grpc as etf_service_pb3_grpc
from typing import Tuple, LiteralString
import yahooquery as yq
import yfinance as yf
import asyncio
import grpc


def ticker_exists(ticker: yf.Ticker) -> dict | None:
    return ticker.get_info() if len(ticker.history()) > 0 else None


async def get_specifics(ticker: str, data: dict, message: dict):
    etf_specifics = yq.Ticker(ticker, asynchronus=True)
    holding_info = etf_specifics.fund_holding_info.get(ticker, None)
    if holding_info is None:
        return None

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
    ].get("annualReportExpenseRatio", 0)


class EtfServiceServicer(etf_service_pb3_grpc.EtfServiceServicer):
    periods: Tuple[Tuple[LiteralString, LiteralString]] = (
        ("ytd", "ytd"),
        ("1mo", "one_month"),
        ("3mo", "three_months"),
        ("6mo", "six_months"),
        ("1y", "one_year"),
        ("3y", "three_years"),
        ("5y", "five_years"),
        ("max", "max"),
    )

    def __init__(self, db_collection, collection_name) -> None:
        super().__init__()
        self.db = db_collection[collection_name]

    async def GetEtf(self, request, context: grpc.ServicerContext):
        res = self.db.find_one({"yahoo_symbol": request.yahoo_symbol}, {"_id": False})
        if res is None:
            await context.abort(
                grpc.StatusCode.NOT_FOUND,
                f"ETF with ticker: {request.yahoo_symbol} not found",
            )
        return etf_service_pb3.Etf(**res)

    async def AddEtf(self, request, context: grpc.ServicerContext):
        if self.db.find_one({"yahoo_symbol": request.yahoo_symbol}) is not None:
            await context.abort(
                grpc.StatusCode.ALREADY_EXISTS,
                f"ETF with ticker: {request.yahoo_symbol} already exists in the db",
            )

        etf = yf.Ticker(request.yahoo_symbol)
        etf_info = ticker_exists(etf)
        if etf_info is None:
            await context.abort(
                grpc.StatusCode.NOT_FOUND,
                f"ETF with ticker: {request.yahoo_symbol} not found",
            )

        data, spec, mesage = {}, {}, {}
        specifics_task = asyncio.create_task(
            get_specifics(request.yahoo_symbol, spec, mesage)
        )

        data["name"] = etf_info["longName"]
        data["currency"] = etf_info["currency"]
        data["yahoo_symbol"] = etf_info["symbol"]
        data["last_close"] = etf_info["previousClose"]
        data["total_assets"] = etf_info.get("totalAssets", 0)

        details = await specifics_task
        if details is None:
            await context.abort(
                grpc.StatusCode.NOT_FOUND,
                f"cannot fetch ETF details for: {request.yahoo_symbol}",
            )

        etf_db_data = {**data, **spec}
        etf_message = {**mesage, **spec}
        self.db.insert_one(etf_db_data)

        return etf_service_pb3.Etf(**etf_message)

    async def GetEtfPerformance(self, request, context: grpc.ServicerContext):
        etf = yf.Ticker(request.yahoo_symbol)

        if ticker_exists(etf) is None:
            await context.abort(
                grpc.StatusCode.NOT_FOUND,
                f"cannot resolve symbol: {request.yahoo_symbol}",
            )

        last_close = float(etf.history(period="1d").iloc[-1]["Close"])

        update_db = asyncio.create_task(
            self.update_price(request.yahoo_symbol, last_close)
        )

        prices = {
            message_field_name: float(etf.history(period=per).iloc[0]["Close"])
            for per, message_field_name in self.periods
        }
        prices["last_close"] = last_close

        if await update_db is None:
            await context.abort(
                grpc.StatusCode.NOT_FOUND,
                f"could not update ETF with ticker: {request.yahoo_symbol}",
            )

        return etf_service_pb3.EtfPerformance(**prices)

    async def update_price(self, ticker: str, value: float):
        try:
            return self.db.find_one_and_update(
                {"yahoo_symbol": ticker}, {"$set": {"last_close": value}}
            )
        except Exception:
            return None

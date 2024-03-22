from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import (
    ClassVar as _ClassVar,
    Iterable as _Iterable,
    Mapping as _Mapping,
    Optional as _Optional,
    Union as _Union,
)

DESCRIPTOR: _descriptor.FileDescriptor

class EtfHoldings(_message.Message):
    __slots__ = ("symbol", "holding_name", "holding_percent")
    SYMBOL_FIELD_NUMBER: _ClassVar[int]
    HOLDING_NAME_FIELD_NUMBER: _ClassVar[int]
    HOLDING_PERCENT_FIELD_NUMBER: _ClassVar[int]
    symbol: str
    holding_name: str
    holding_percent: float
    def __init__(
        self,
        symbol: _Optional[str] = ...,
        holding_name: _Optional[str] = ...,
        holding_percent: _Optional[float] = ...,
    ) -> None: ...

class SectorWeights(_message.Message):
    __slots__ = ("sector_name", "sector_weight")
    SECTOR_NAME_FIELD_NUMBER: _ClassVar[int]
    SECTOR_WEIGHT_FIELD_NUMBER: _ClassVar[int]
    sector_name: str
    sector_weight: float
    def __init__(
        self, sector_name: _Optional[str] = ..., sector_weight: _Optional[float] = ...
    ) -> None: ...

class Etf(_message.Message):
    __slots__ = ("ticker", "yahoo_symbol", "name", "currency", "holdings", "weights")
    TICKER_FIELD_NUMBER: _ClassVar[int]
    YAHOO_SYMBOL_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    CURRENCY_FIELD_NUMBER: _ClassVar[int]
    HOLDINGS_FIELD_NUMBER: _ClassVar[int]
    WEIGHTS_FIELD_NUMBER: _ClassVar[int]
    ticker: str
    yahoo_symbol: str
    name: str
    currency: str
    holdings: _containers.RepeatedCompositeFieldContainer[EtfHoldings]
    weights: _containers.RepeatedCompositeFieldContainer[SectorWeights]
    def __init__(
        self,
        ticker: _Optional[str] = ...,
        yahoo_symbol: _Optional[str] = ...,
        name: _Optional[str] = ...,
        currency: _Optional[str] = ...,
        holdings: _Optional[_Iterable[_Union[EtfHoldings, _Mapping]]] = ...,
        weights: _Optional[_Iterable[_Union[SectorWeights, _Mapping]]] = ...,
    ) -> None: ...

class GetEtfByName(_message.Message):
    __slots__ = ("name",)
    NAME_FIELD_NUMBER: _ClassVar[int]
    name: str
    def __init__(self, name: _Optional[str] = ...) -> None: ...

class GetEtfByTicker(_message.Message):
    __slots__ = ("yahoo_symbol",)
    YAHOO_SYMBOL_FIELD_NUMBER: _ClassVar[int]
    yahoo_symbol: str
    def __init__(self, yahoo_symbol: _Optional[str] = ...) -> None: ...

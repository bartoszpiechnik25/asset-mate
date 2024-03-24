db = db.getSiblingDB('financial-instruments');

db.createCollection('etfs');

db.etfs.insertMany([
    {
        "yahoo_symbol": "XDWT.DE",
        "name": "SPDR S&P 500 ETF Trust",
        "currency": "USD",
        "price": 400.00,
    },
    {
        "ticker": "QQQ",
        "name": "Invesco QQQ Trust",
        "type": "ETF",
        "exchange": "NASDAQ",
        "currency": "USD",
        "price": 300.00,
        "last_updated": new Date()
    },
    {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "type": "Stock",
        "exchange": "NASDAQ",
        "currency": "USD",
        "price": 150.00,
        "last_updated": new Date()
    }
]);

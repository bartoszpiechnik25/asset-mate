db = db.getSiblingDB('financial-instruments');

db.createCollection('etfs');

db.etfs.insertMany([
    {
        "yahoo_symbol": "XDWT.DE",
        "name": "SPDR S&P 500 ETF Trust",
        "currency": "USD",
        "last_close": 400.00,
        "expense_ratio": 0.0025,
    }
]);

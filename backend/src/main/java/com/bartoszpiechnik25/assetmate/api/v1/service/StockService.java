package com.bartoszpiechnik25.assetmate.api.v1.service;


import com.bartoszpiechnik25.assetmate.api.v1.repository.StockRepository;
import com.bartoszpiechnik25.assetmate.api.v1.repository.SymbolRepository;
import com.bartoszpiechnik25.entity.Stock;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StockService {

    private final SymbolRepository symbolRepository;
    private final StockRepository stockRepository;

    public Stock getStockByYahooSymbol(String yahoo_symbol) {
        var symbol = symbolRepository.getSymbolByYahooSymbol(yahoo_symbol).orElse(null);
        if (symbol == null) {
            return null;
        }
        return stockRepository.getStockBySymbol(symbol).orElse(null);
    }
}

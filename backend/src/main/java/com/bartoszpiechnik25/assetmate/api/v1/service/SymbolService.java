package com.bartoszpiechnik25.assetmate.api.v1.service;

import com.bartoszpiechnik25.assetmate.api.v1.dto.request.AddSymbolRequest;
import com.bartoszpiechnik25.assetmate.api.v1.repository.InstrumentTypeRepository;
import com.bartoszpiechnik25.assetmate.api.v1.repository.SymbolPerformanceRepository;
import com.bartoszpiechnik25.assetmate.api.v1.repository.SymbolRepository;
import com.bartoszpiechnik25.entity.Symbol;
import com.bartoszpiechnik25.entity.SymbolPerformance;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SymbolService {
    private final SymbolRepository symbolRepository;
    private final SymbolPerformanceRepository symbolPerformanceRepository;
    private final InstrumentTypeRepository instrumentTypeRepository;

    public List<Symbol> getAllSymbols() {
        return symbolRepository.findAll();
    }

    public SymbolPerformance getSymbolPerformance(String yahoo_symbol) {
        return symbolPerformanceRepository.getSymbolPerformanceBySymbolYahooSymbol(yahoo_symbol).orElse(null);
    }

    public Symbol addNewSymbol(AddSymbolRequest symbolRequest) {
        var instrumentType = instrumentTypeRepository.getInstrumentTypeByInstrumentTypeName(symbolRequest.getInstrumentType()).orElse(null);
        if (instrumentType == null) {
            return null;
        }
        var symbol = new Symbol();
        symbol.setYahooSymbol(symbolRequest.getYahooSymbol());
        symbol.setInstrumentType(instrumentType);
        symbol.setDescription(symbolRequest.getDescription());
        return symbolRepository.save(symbol);
    }
}

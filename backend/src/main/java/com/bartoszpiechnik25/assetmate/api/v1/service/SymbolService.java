package com.bartoszpiechnik25.assetmate.api.v1.service;

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

    public List<Symbol> getAllSymbols() {
        return symbolRepository.findAll();
    }

    public SymbolPerformance getSymbolPerformance(String yahoo_symbol) {
        return symbolPerformanceRepository.getSymbolPerformanceBySymbolYahooSymbol(yahoo_symbol).orElse(null);
    }
}

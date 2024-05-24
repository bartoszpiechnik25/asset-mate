package com.bartoszpiechnik25.assetmate.api.v1.service;


import com.bartoszpiechnik25.assetmate.api.v1.repository.EtfRepository;
import com.bartoszpiechnik25.assetmate.api.v1.repository.SymbolRepository;
import com.bartoszpiechnik25.entity.Etf;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class EtfService {
    private final SymbolRepository symbolRepository;
    private final EtfRepository etfRepository;

    public Etf getEtfDetails(String yahoo_symbol) {
       var symbol= symbolRepository.getSymbolByYahooSymbol(yahoo_symbol).orElse(null);
       if (symbol == null) {
           return null;
       }
       var etfOrNull = etfRepository.getEtfBySymbol(symbol);
       return etfOrNull.orElse(null);
    }
}

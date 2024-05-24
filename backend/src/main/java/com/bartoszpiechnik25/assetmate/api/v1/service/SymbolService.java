package com.bartoszpiechnik25.assetmate.api.v1.service;

import com.bartoszpiechnik25.assetmate.api.v1.repository.SymbolRepository;
import com.bartoszpiechnik25.entity.Symbol;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SymbolService {
    private final SymbolRepository symbolRepository;

    public List<Symbol> getAllSymbols() {
        return symbolRepository.findAll();
    }
}

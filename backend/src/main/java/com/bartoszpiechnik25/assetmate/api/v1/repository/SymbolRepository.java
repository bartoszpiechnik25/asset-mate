package com.bartoszpiechnik25.assetmate.api.v1.repository;

import com.bartoszpiechnik25.entity.Symbol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface SymbolRepository extends JpaRepository<Symbol, UUID> {
    Optional<Symbol> getSymbolByYahooSymbol(String yahoo_symbol);
}

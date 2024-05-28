package com.bartoszpiechnik25.assetmate.api.v1.repository;

import com.bartoszpiechnik25.entity.SymbolPerformance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface SymbolPerformanceRepository extends JpaRepository<SymbolPerformance, UUID> {
    Optional<SymbolPerformance> getSymbolPerformanceBySymbolYahooSymbol(String yahoo_symbol);
}

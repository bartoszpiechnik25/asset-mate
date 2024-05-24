package com.bartoszpiechnik25.assetmate.api.v1.repository;

import com.bartoszpiechnik25.entity.Stock;
import com.bartoszpiechnik25.entity.Symbol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface StockRepository extends JpaRepository<Stock, UUID> {
    Optional<Stock> getStockBySymbol(Symbol symbol);
}

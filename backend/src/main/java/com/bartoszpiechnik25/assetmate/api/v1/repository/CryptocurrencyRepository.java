package com.bartoszpiechnik25.assetmate.api.v1.repository;

import com.bartoszpiechnik25.entity.Cryptocurrency;
import com.bartoszpiechnik25.entity.Symbol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CryptocurrencyRepository extends JpaRepository<Cryptocurrency, UUID> {
    Optional<Cryptocurrency> findByCryptoSymbol(String cryptoSymbol);
    Optional<Cryptocurrency> findByGeckoId(String geckoId);
    Optional<Cryptocurrency> findBySymbol(Symbol symbol);
}

package com.bartoszpiechnik25.assetmate.api.v1.repository;

import com.bartoszpiechnik25.entity.Etf;
import com.bartoszpiechnik25.entity.Symbol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface EtfRepository extends JpaRepository<Etf, UUID> {
    Optional<Etf> getEtfBySymbol(Symbol symbol);
}
